export interface Influencer {
  slug: string;
  name: string;
  username: string;
  niche: string;
  followers: string;
  engagementRate: string;
  description: string;
  about: {
    creates: string;
    audience: string;
  };
  metrics: {
    avgViews: string;
    engagementRate: string;
    audienceLocation: string;
  };
  pastWork: {
    brands: string[];
    sampleContent: string[];
  };
  services: string[];
  initials: string;
  accentColor: string;
}

export const influencers: Influencer[] = [
  {
    slug: "aisha-rahman",
    name: "Aisha Rahman",
    username: "@aisharahman",
    niche: "Business & Entrepreneurship",
    followers: "284K",
    engagementRate: "4.8%",
    description: "Helping founders build authority through authentic storytelling and strategic content.",
    initials: "AR",
    accentColor: "#0B0B0B",
    about: {
      creates: "Long-form LinkedIn essays, founder interview series, and weekly business breakdowns that cut through noise with clear, actionable thinking.",
      audience: "Founders, operators, and aspiring entrepreneurs aged 25-40 who value depth over virality.",
    },
    metrics: {
      avgViews: "120K per post",
      engagementRate: "4.8%",
      audienceLocation: "US (42%), UK (18%), UAE (14%), Canada (11%)",
    },
    pastWork: {
      brands: ["Notion", "Loom", "Stripe", "HubSpot"],
      sampleContent: [
        "LinkedIn series: 'How I built a 6-figure consulting practice without cold outreach'",
        "Interview: 'The founder who exited twice before 35'",
        "Newsletter drop: 'Why your content strategy is costing you clients'",
      ],
    },
    services: ["Sponsored Posts", "Newsletter Takeovers", "Brand Collaborations", "Speaking Partnerships"],
  },
  {
    slug: "marcus-obi",
    name: "Marcus Obi",
    username: "@marcobi",
    niche: "Personal Finance",
    followers: "512K",
    engagementRate: "6.1%",
    description: "Breaking down wealth-building strategies that actually work for the next generation.",
    initials: "MO",
    accentColor: "#1a1a1a",
    about: {
      creates: "Short-form video explainers, deep-dive threads, and monthly market breakdowns designed to make finance accessible without dumbing it down.",
      audience: "Millennials and Gen Z professionals building their first real wealth — skeptical of traditional advice and hungry for practical frameworks.",
    },
    metrics: {
      avgViews: "380K per video",
      engagementRate: "6.1%",
      audienceLocation: "US (55%), UK (22%), Australia (9%), Nigeria (8%)",
    },
    pastWork: {
      brands: ["Wealthsimple", "Robinhood", "Coursera", "Morning Brew"],
      sampleContent: [
        "Video: 'The index fund strategy nobody teaches you in your 20s'",
        "Thread: '7 money moves I made before 30 that changed everything'",
        "Sponsored breakdown: 'Comparing every major investment app in 2025'",
      ],
    },
    services: ["Sponsored Videos", "Brand Integrations", "Product Reviews", "Affiliate Partnerships"],
  },
  {
    slug: "sofia-chen",
    name: "Sofia Chen",
    username: "@sofiabuilds",
    niche: "Technology & AI",
    followers: "198K",
    engagementRate: "5.4%",
    description: "Demystifying AI and technology for founders who need to stay ahead without the hype.",
    initials: "SC",
    accentColor: "#2a2a2a",
    about: {
      creates: "Technical yet accessible AI breakdowns, founder-focused product reviews, and weekly 'what's actually happening in tech' newsletters.",
      audience: "Non-technical founders, product managers, and senior operators who need to make tech decisions without being engineers.",
    },
    metrics: {
      avgViews: "95K per post",
      engagementRate: "5.4%",
      audienceLocation: "US (38%), India (21%), UK (16%), Singapore (10%)",
    },
    pastWork: {
      brands: ["Anthropic", "Midjourney", "Linear", "Zapier"],
      sampleContent: [
        "Breakdown: 'Every AI tool a founder actually needs in 2025'",
        "Newsletter: 'The week in AI — what matters and what's noise'",
        "Video series: 'No-code AI workflows for non-technical teams'",
      ],
    },
    services: ["Product Reviews", "Sponsored Content", "Brand Collaborations", "Webinar Partnerships"],
  },
  {
    slug: "jordan-west",
    name: "Jordan West",
    username: "@jordanwestgrowth",
    niche: "Marketing & Growth",
    followers: "341K",
    engagementRate: "5.9%",
    description: "Growth frameworks and marketing strategies built for founders who are playing the long game.",
    initials: "JW",
    accentColor: "#111111",
    about: {
      creates: "Case studies, marketing audits, and step-by-step growth frameworks shared through LinkedIn, newsletters, and bi-weekly YouTube breakdowns.",
      audience: "Early-stage and scaling founders, CMOs, and marketers who want strategy over tactics and systems over hacks.",
    },
    metrics: {
      avgViews: "210K per video",
      engagementRate: "5.9%",
      audienceLocation: "US (48%), UK (20%), Australia (12%), Canada (9%)",
    },
    pastWork: {
      brands: ["ConvertKit", "Webflow", "Ahrefs", "Clearbit"],
      sampleContent: [
        "Case study: 'How this SaaS went from 0 to 50K users without paid ads'",
        "Framework: 'The content flywheel that replaced my lead gen strategy'",
        "YouTube: 'Full growth audit of a 7-figure DTC brand (live)'",
      ],
    },
    services: ["Sponsored Posts", "Case Study Features", "Brand Collaborations", "Consulting Content"],
  },
  {
    slug: "priya-nair",
    name: "Priya Nair",
    username: "@priyacreates",
    niche: "Leadership & Management",
    followers: "167K",
    engagementRate: "7.2%",
    description: "Teaching ambitious leaders how to scale themselves so their business can scale too.",
    initials: "PN",
    accentColor: "#0d0d0d",
    about: {
      creates: "Executive coaching content, leadership frameworks, and raw behind-the-scenes posts about building and leading high-performance teams.",
      audience: "Founders managing their first teams, senior managers stepping into leadership, and operators building company culture from scratch.",
    },
    metrics: {
      avgViews: "74K per post",
      engagementRate: "7.2%",
      audienceLocation: "UK (34%), US (30%), India (20%), UAE (10%)",
    },
    pastWork: {
      brands: ["Atlassian", "Culture Amp", "Rippling", "Deel"],
      sampleContent: [
        "Post series: 'The 5 conversations every leader is avoiding'",
        "Video: 'My first 90-day framework for new team leaders'",
        "Newsletter: 'Why your best people keep leaving (and how to stop it)'",
      ],
    },
    services: ["Sponsored Posts", "Brand Integration", "Speaking Partnerships", "Workshop Collaborations"],
  },
  {
    slug: "tomas-reyes",
    name: "Tomas Reyes",
    username: "@tomasbuilds",
    niche: "E-commerce & DTC",
    followers: "423K",
    engagementRate: "5.5%",
    description: "Behind-the-scenes of building a real product business — from sourcing to scaling.",
    initials: "TR",
    accentColor: "#181818",
    about: {
      creates: "Raw operational content, supplier frameworks, DTC growth strategies, and unfiltered lessons from running a 7-figure product brand.",
      audience: "Aspiring and active e-commerce founders, DTC operators, and product entrepreneurs who value transparency over polished highlights.",
    },
    metrics: {
      avgViews: "290K per video",
      engagementRate: "5.5%",
      audienceLocation: "US (51%), UK (16%), Mexico (12%), Canada (8%)",
    },
    pastWork: {
      brands: ["Shopify", "Klaviyo", "Gorgias", "Recharge"],
      sampleContent: [
        "YouTube: 'I documented every decision building my first 7-figure product'",
        "Thread: 'The supplier negotiation framework that saved me $200K'",
        "Sponsored breakdown: 'Every tool I actually use to run my DTC brand'",
      ],
    },
    services: ["Product Reviews", "Sponsored Videos", "Brand Integration", "Affiliate Partnerships"],
  },
];
