import { Router } from "express";
import { createHmac, timingSafeEqual } from "crypto";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI(
  process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
    ? {
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      }
    : {
        apiKey: process.env.OPENAI_API_KEY ?? "",
      }
);

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

router.post("/analyze", authMiddleware, async (req, res) => {
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

    const otherPosts = allPosts
      .filter((p) => p.title !== title)
      .slice(0, 10)
      .map((p) => `- "${p.title}" (slug: /${p.slug})${p.excerpt ? ` — ${p.excerpt.slice(0, 80)}` : ""}`)
      .join("\n");

    const prompt = `You are an expert SEO strategist analyzing a blog post for a content & authority studio website. Return ONLY valid JSON, no markdown.

BLOG POST:
Title: "${title}"
Focus Keyword: "${keyword || "none specified"}"
Excerpt: "${excerpt || "none"}"
Word Count: ${wordCount}
Content preview: "${plainContent.slice(0, 2000)}"

OTHER POSTS ON SITE:
${otherPosts || "None yet"}

Return this exact JSON structure (no extra keys, no text outside JSON):
{
  "aiScore": <integer 0-100>,
  "scoreBreakdown": {
    "semanticCoverage": <0-100>,
    "topicCompleteness": <0-100>,
    "searchIntent": <0-100>,
    "readability": <0-100>,
    "structure": <0-100>
  },
  "intent": "<informational|commercial|transactional>",
  "intentExplanation": "<1 sentence>",
  "idealStructure": ["<section name>"],
  "contentGaps": ["<missing subtopic>"],
  "semanticKeywords": [
    { "term": "<NLP related term>", "placement": "<intro|H2|body|conclusion|meta>" }
  ],
  "titleVariations": [
    { "title": "<alternative title>", "ctrScore": <1-10>, "hook": "<why it works>" }
  ],
  "criticalIssues": ["<critical problem>"],
  "improvements": ["<actionable improvement>"],
  "advanced": ["<expert tip>"],
  "internalLinkSuggestions": [
    { "slug": "<slug>", "title": "<title>", "anchorText": "<anchor>", "reason": "<why>" }
  ]
}

Constraints: semanticKeywords 5-8 items, titleVariations exactly 4 (question/number/power word/curiosity gap), contentGaps 3-6, criticalIssues 0-3, improvements 3-5, advanced 2-4, internalLinkSuggestions only from OTHER POSTS list (0-3 max).`;

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 2000,
      messages: [
        { role: "system", content: "You are an expert SEO analyst. Return only valid JSON, nothing else." },
        { role: "user", content: prompt },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    let parsed: Record<string, unknown>;
    try {
      const m = raw.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(m ? m[0] : raw);
    } catch {
      parsed = { error: "Parse failed" };
    }

    res.json({ ok: true, analysis: parsed });
  } catch (err) {
    console.error("AI SEO error:", err);
    res.status(500).json({ ok: false, error: "AI analysis failed" });
  }
});

export default router;
