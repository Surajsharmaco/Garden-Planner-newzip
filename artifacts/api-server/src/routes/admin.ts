import { Router } from "express";
import { randomBytes } from "crypto";
import { db, siteContent, leads } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

const activeSessions = new Map<string, number>();
const SESSION_TTL = 24 * 60 * 60 * 1000;

function generateToken(): string {
  return randomBytes(32).toString("hex");
}

function authMiddleware(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction,
) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.slice(7);
  const expiry = activeSessions.get(token);
  if (!expiry || Date.now() > expiry) {
    activeSessions.delete(token);
    res.status(401).json({ error: "Session expired" });
    return;
  }
  next();
}

router.post("/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(500).json({ error: "ADMIN_PASSWORD env var not set" });
    return;
  }
  if (password !== adminPassword) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const token = generateToken();
  activeSessions.set(token, Date.now() + SESSION_TTL);
  logger.info("Admin login successful");
  res.json({ token });
});

router.post("/logout", authMiddleware, (req, res) => {
  const token = req.headers.authorization?.slice(7);
  if (token) activeSessions.delete(token);
  res.json({ success: true });
});

router.get("/verify", authMiddleware, (_req, res) => {
  res.json({ ok: true });
});

// ── Public (no-auth) read endpoint for public site ──
router.get("/public/content/:section", async (req, res) => {
  const { section } = req.params;
  try {
    const rows = await db.select().from(siteContent).where(eq(siteContent.section, section));
    if (rows.length === 0) { res.json({ section, data: null }); return; }
    res.json(rows[0]);
  } catch {
    res.json({ section, data: null });
  }
});

router.get("/sections", authMiddleware, async (_req, res) => {
  const rows = await db
    .select({ section: siteContent.section, updatedAt: siteContent.updatedAt })
    .from(siteContent);
  res.json(rows);
});

router.get("/content/:section", authMiddleware, async (req, res) => {
  const { section } = req.params;
  const rows = await db
    .select()
    .from(siteContent)
    .where(eq(siteContent.section, section));
  if (rows.length === 0) {
    res.json({ section, data: null });
    return;
  }
  res.json(rows[0]);
});

router.put("/content/:section", authMiddleware, async (req, res) => {
  const { section } = req.params;
  const { data } = req.body;
  if (data === undefined) {
    res.status(400).json({ error: "data field required" });
    return;
  }
  await db
    .insert(siteContent)
    .values({ section, data })
    .onConflictDoUpdate({
      target: siteContent.section,
      set: { data, updatedAt: new Date() },
    });
  logger.info({ section }, "Admin content updated");
  res.json({ success: true, section });
});

// ── Leads / CRM ──

router.get("/leads", authMiddleware, async (req, res) => {
  const { type } = req.query;
  let rows;
  if (type && type !== "all") {
    rows = await db.select().from(leads).where(eq(leads.type, String(type))).orderBy(desc(leads.createdAt));
  } else {
    rows = await db.select().from(leads).orderBy(desc(leads.createdAt));
  }
  res.json(rows);
});

router.get("/leads/stats", authMiddleware, async (_req, res) => {
  const rows = await db.select().from(leads);
  const byType: Record<string, number> = {};
  for (const row of rows) {
    byType[row.type] = (byType[row.type] ?? 0) + 1;
  }
  res.json({ total: rows.length, byType });
});

router.delete("/leads/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(leads).where(eq(leads.id, id));
  res.json({ success: true });
});

export { authMiddleware };
export default router;
