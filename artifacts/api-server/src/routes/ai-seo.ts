import { Router } from "express";
import { createHmac, timingSafeEqual } from "crypto";

const router = Router();

function verifyToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiry, , sig] = parts;
  const expMs = Number(expiry);
  if (isNaN(expMs) || Date.now() > expMs) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const secret = process.env.ADMIN_PASSWORD ?? "";
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const eSig = Buffer.from(sig, "hex");
  const eExp = Buffer.from(expected, "hex");
  if (eSig.length !== eExp.length) return false;
  return timingSafeEqual(eSig, eExp);
}

function authMiddleware(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction,
) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) { res.status(401).json({ error: "Unauthorized" }); return; }
  if (!verifyToken(auth.slice(7))) { res.status(401).json({ error: "Invalid or expired session" }); return; }
  next();
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with","by","from","is","are",
  "was","were","be","been","being","have","has","had","do","does","did","will","would","could",
  "should","may","might","shall","can","this","that","these","those","it","its","i","you","he",
  "she","we","they","what","which","who","when","where","how","why","not","no","so","if","as",
  "up","out","about","into","than","then","there","their","they","them","your","our","my","his",
  "her","its","we","us","me","him","she","he","also","just","more","very","all","any","some",
  "each","every","most","other","such","same","over","after","before","between","through",
]);

const COMMERCIAL_SIGNALS = ["buy","price","cost","cheap","best","top","review","vs","versus","compare","discount","deal","hire","service","agency","package","plan","pricing"];
const TRANSACTIONAL_SIGNALS = ["download","get","start","try","sign up","register","book","order","purchase","contact","free","now","today","instant"];
const INFORMATIONAL_SIGNALS = ["how","what","why","when","guide","tutorial","tips","learn","understand","explain","meaning","definition","example","steps","ways"];

function detectIntent(title: string, content: string): { intent: string; explanation: string } {
  const text = (title + " " + content).toLowerCase();
  const words = text.split(/\s+/);

  const comm = COMMERCIAL_SIGNALS.filter(w => text.includes(w)).length;
  const trans = TRANSACTIONAL_SIGNALS.filter(w => text.includes(w)).length;
  const info = INFORMATIONAL_SIGNALS.filter(w => words.some(word => word.startsWith(w))).length;

  if (trans >= 2) return { intent: "transactional", explanation: "Content signals user is ready to take action (buy, sign up, contact)." };
  if (comm >= 2) return { intent: "commercial", explanation: "Content helps users evaluate options before making a decision." };
  return { intent: "informational", explanation: "Content primarily educates or informs the reader about a topic." };
}

function extractSemanticKeywords(content: string, keyword: string, title: string): Array<{ term: string; placement: string }> {
  const text = stripHtml(content).toLowerCase();
  const words = text.split(/\W+/).filter(w => w.length > 4 && !STOP_WORDS.has(w));

  const freq: Record<string, number> = {};
  for (const word of words) {
    freq[word] = (freq[word] ?? 0) + 1;
  }

  const kw = keyword.toLowerCase().split(/\s+/);
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => !STOP_WORDS.has(w));

  const sorted = Object.entries(freq)
    .filter(([w]) => !kw.includes(w) && !titleWords.includes(w) && w.length > 4)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([term]) => term);

  const placements = ["intro", "H2", "body", "body", "conclusion", "meta", "H2", "body", "intro", "body", "conclusion", "meta"];
  return sorted.slice(0, 7).map((term, i) => ({ term, placement: placements[i] ?? "body" }));
}

function generateTitleVariations(title: string, keyword: string): Array<{ title: string; ctrScore: number; hook: string }> {
  const kw = keyword || title.split(" ").slice(0, 3).join(" ");
  const year = new Date().getFullYear();

  return [
    {
      title: `How to ${kw}: A Complete Guide (${year})`,
      ctrScore: 8,
      hook: "Question format + year signals freshness and completeness.",
    },
    {
      title: `${kw}: 7 Proven Strategies That Actually Work`,
      ctrScore: 9,
      hook: "Number + social proof drives higher click-through in search results.",
    },
    {
      title: `Why Most People Fail at ${kw} (And How to Avoid It)`,
      ctrScore: 8,
      hook: "Curiosity gap creates emotional tension that compels clicks.",
    },
    {
      title: `The Ultimate ${kw} Playbook for ${year}`,
      ctrScore: 7,
      hook: "Power word 'Ultimate' + year positions this as the definitive resource.",
    },
  ];
}

function checkCriticalIssues(title: string, content: string, keyword: string, wordCount: number): string[] {
  const issues: string[] = [];
  const text = (title + " " + content).toLowerCase();
  const kw = keyword.toLowerCase();

  if (wordCount < 300) issues.push("Content is too short (under 300 words). Aim for at least 800 words for strong rankings.");
  if (keyword && !text.includes(kw)) issues.push(`Focus keyword "${keyword}" does not appear in the content. Include it naturally.`);
  if (keyword && title && !title.toLowerCase().includes(kw)) issues.push(`Focus keyword missing from the title tag. Place it near the beginning.`);
  if (!/<h[2-6]/i.test(content) && wordCount > 400) issues.push("No subheadings (H2/H3) detected. Break up long content with clear sections.");

  return issues;
}

function buildImprovements(wordCount: number, content: string, keyword: string): string[] {
  const improvements: string[] = [];
  const hasImages = /<img/i.test(content);
  const hasLinks = /<a\s/i.test(content);
  const hasList = /<ul|<ol/i.test(content);
  const kw = keyword.toLowerCase();
  const text = content.toLowerCase();

  if (!hasImages) improvements.push("Add at least one relevant image with a descriptive alt tag containing your focus keyword.");
  if (!hasLinks) improvements.push("Include 2-3 internal links to related content on your site to improve crawlability.");
  if (!hasList) improvements.push("Use bullet points or numbered lists to improve readability and increase dwell time.");
  if (wordCount < 800) improvements.push("Expand content to 800-1200 words. Longer posts rank better for competitive keywords.");
  if (kw && !text.slice(0, 200).includes(kw)) improvements.push(`Mention your focus keyword "${keyword}" within the first 100 words (intro paragraph).`);
  if (!/<strong|<b>/i.test(content)) improvements.push("Bold 2-3 key phrases to signal importance to search engines and improve scannability.");

  return improvements.slice(0, 5);
}

function buildContentGaps(title: string, keyword: string, intent: string): string[] {
  const gaps: string[] = [];
  const text = (title + " " + keyword).toLowerCase();

  if (intent === "informational") {
    if (!text.includes("example")) gaps.push("Real-world examples or case studies");
    if (!text.includes("step")) gaps.push("Step-by-step process breakdown");
    gaps.push("Common mistakes and how to avoid them");
    gaps.push("FAQs section addressing reader objections");
  } else if (intent === "commercial") {
    gaps.push("Comparison table or pros/cons section");
    gaps.push("Pricing or budget guidance");
    gaps.push("Expert recommendation or editorial verdict");
  } else {
    gaps.push("Clear value proposition above the fold");
    gaps.push("Social proof (testimonials or numbers)");
    gaps.push("Risk-reduction element (guarantee, free trial)");
  }

  return gaps.slice(0, 5);
}

function buildIdealStructure(intent: string, keyword: string): string[] {
  if (intent === "transactional") {
    return ["Headline with clear value proposition", "Key benefits (3-5 bullet points)", "Social proof / results", "Clear CTA / next step", "FAQs"];
  }
  if (intent === "commercial") {
    return ["Introduction + problem statement", "Criteria for evaluation", "Options compared", "Recommendation", "Who it's best for", "Final verdict + CTA"];
  }
  return [
    `Introduction: What is ${keyword || "this topic"} and why it matters`,
    "Key concepts explained simply",
    "Step-by-step breakdown or main strategies",
    "Real examples or data",
    "Common mistakes to avoid",
    "Conclusion + next steps",
  ];
}

function buildAdvancedTips(keyword: string, wordCount: number): string[] {
  return [
    `Add an FAQ section targeting long-tail variations of "${keyword || "your keyword"}" to capture voice search traffic.`,
    "Mark up your content with FAQ or HowTo schema JSON-LD to earn rich snippets in Google.",
    `Update the publish date and refresh 20% of the content every 6 months to maintain freshness signals.`,
    wordCount > 1500
      ? "Consider splitting this into a topic cluster with a pillar page and 3-4 supporting posts linked together."
      : "Build a topic cluster: link this post to a longer pillar page on the broader subject.",
  ];
}

function findInternalLinks(
  title: string,
  keyword: string,
  content: string,
  allPosts: Array<{ slug: string; title: string; excerpt?: string }>,
): Array<{ slug: string; title: string; anchorText: string; reason: string }> {
  if (!allPosts.length) return [];

  const queryWords = new Set([
    ...keyword.toLowerCase().split(/\s+/),
    ...title.toLowerCase().split(/\s+/).filter(w => !STOP_WORDS.has(w)),
  ]);

  const scored = allPosts
    .filter(p => p.title !== title)
    .map(p => {
      const ptWords = (p.title + " " + (p.excerpt ?? "")).toLowerCase().split(/\s+/);
      const overlap = ptWords.filter(w => queryWords.has(w)).length;
      return { ...p, score: overlap };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map(p => ({
    slug: p.slug,
    title: p.title,
    anchorText: p.title.split(" ").slice(0, 4).join(" "),
    reason: `Topic overlap with "${keyword || title}" makes this a natural contextual link.`,
  }));
}

function scoreContent(wordCount: number, content: string, keyword: string, title: string): {
  aiScore: number;
  scoreBreakdown: Record<string, number>;
} {
  const text = content.toLowerCase();
  const kw = keyword.toLowerCase();
  const hasH2 = /<h2/i.test(content);
  const hasH3 = /<h3/i.test(content);
  const hasImages = /<img/i.test(content);
  const hasLinks = /<a\s/i.test(content);
  const hasList = /<ul|<ol/i.test(content);
  const kwInTitle = title.toLowerCase().includes(kw);
  const kwInContent = text.includes(kw);
  const kwCount = (text.match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length;
  const kwDensity = wordCount > 0 ? (kwCount / wordCount) * 100 : 0;

  const semanticCoverage = Math.min(100, Math.round(
    (wordCount >= 800 ? 40 : (wordCount / 800) * 40) +
    (kwInContent ? 25 : 0) +
    (kwDensity >= 0.5 && kwDensity <= 3 ? 20 : 10) +
    (hasImages ? 15 : 0)
  ));

  const topicCompleteness = Math.min(100, Math.round(
    (wordCount >= 1200 ? 50 : (wordCount / 1200) * 50) +
    (hasH2 ? 20 : 0) +
    (hasH3 ? 15 : 0) +
    (hasList ? 15 : 0)
  ));

  const searchIntent = Math.min(100, Math.round(
    (kwInTitle ? 40 : 15) +
    (kwInContent ? 30 : 0) +
    (wordCount >= 400 ? 30 : (wordCount / 400) * 30)
  ));

  const readability = Math.min(100, Math.round(
    (hasList ? 25 : 0) +
    (hasH2 ? 25 : 0) +
    (wordCount >= 300 ? 25 : (wordCount / 300) * 25) +
    (hasImages ? 25 : 10)
  ));

  const structure = Math.min(100, Math.round(
    (hasH2 ? 30 : 0) +
    (hasH3 ? 20 : 0) +
    (hasLinks ? 20 : 0) +
    (hasList ? 15 : 0) +
    (hasImages ? 15 : 0)
  ));

  const aiScore = Math.round((semanticCoverage + topicCompleteness + searchIntent + readability + structure) / 5);

  return {
    aiScore,
    scoreBreakdown: { semanticCoverage, topicCompleteness, searchIntent, readability, structure },
  };
}

router.post("/analyze", authMiddleware, (req, res) => {
  try {
    const { content = "", title = "", keyword = "", excerpt = "", allPosts = [] } = req.body as {
      content: string;
      title: string;
      keyword: string;
      excerpt: string;
      allPosts: Array<{ slug: string; title: string; excerpt?: string }>;
    };

    const plainContent = stripHtml(content);
    const wordCount = plainContent.split(/\s+/).filter(Boolean).length;

    const { aiScore, scoreBreakdown } = scoreContent(wordCount, content, keyword, title);
    const { intent, explanation: intentExplanation } = detectIntent(title, plainContent);
    const semanticKeywords = extractSemanticKeywords(content, keyword, title);
    const titleVariations = generateTitleVariations(title, keyword);
    const criticalIssues = checkCriticalIssues(title, content, keyword, wordCount);
    const improvements = buildImprovements(wordCount, content, keyword);
    const contentGaps = buildContentGaps(title, keyword, intent);
    const idealStructure = buildIdealStructure(intent, keyword);
    const advanced = buildAdvancedTips(keyword, wordCount);
    const internalLinkSuggestions = findInternalLinks(title, keyword, plainContent, allPosts);

    res.json({
      ok: true,
      analysis: {
        aiScore,
        scoreBreakdown,
        intent,
        intentExplanation,
        idealStructure,
        contentGaps,
        semanticKeywords,
        titleVariations,
        criticalIssues,
        improvements,
        advanced,
        internalLinkSuggestions,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Analysis failed" });
  }
});

export default router;
