import { Router } from "express";
import { randomBytes, createHmac, timingSafeEqual, scrypt } from "crypto";
import { db, pool, siteContent, leads, certificates, teamMembers } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { logger } from "../lib/logger";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { readdir, mkdir, stat } from "fs/promises";
import { existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.resolve(__dirname, "../../uploads");

if (!existsSync(UPLOADS_DIR)) {
  await mkdir(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".png";
    const safe = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    cb(null, `${Date.now()}_${safe}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const router = Router();

const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;
const revokedTokens = new Set<string>();

type AdminRole = "super" | "member";

interface TokenPayload {
  role: AdminRole;
  permissions: string[];
}

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? randomBytes(16).toString("hex");
}

function generateToken(role: AdminRole, permissions: string[]): string {
  const expiry = String(Date.now() + SESSION_TTL);
  const nonce = randomBytes(8).toString("hex");
  const permsB64 = Buffer.from(JSON.stringify(permissions)).toString("base64url");
  const payload = `${expiry}.${nonce}.${role}.${permsB64}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifyToken(token: string): { valid: false } | ({ valid: true } & TokenPayload) {
  if (revokedTokens.has(token)) return { valid: false };
  const parts = token.split(".");

  if (parts.length === 5) {
    const [expiry, nonce, role, permsB64, sig] = parts;
    const expMs = Number(expiry);
    if (isNaN(expMs) || Date.now() > expMs) return { valid: false };
    const payload = `${expiry}.${nonce}.${role}.${permsB64}`;
    const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
    const eSig = Buffer.from(sig, "hex");
    const eExp = Buffer.from(expected, "hex");
    if (eSig.length !== eExp.length) return { valid: false };
    if (!timingSafeEqual(eSig, eExp)) return { valid: false };
    let permissions: string[] = [];
    try {
      permissions = JSON.parse(Buffer.from(permsB64, "base64url").toString());
    } catch {
      return { valid: false };
    }
    return { valid: true, role: role as AdminRole, permissions };
  }

  if (parts.length === 3) {
    const [expiry, nonce, sig] = parts;
    const expMs = Number(expiry);
    if (isNaN(expMs) || Date.now() > expMs) return { valid: false };
    const payload = `${expiry}.${nonce}`;
    const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
    const eSig = Buffer.from(sig, "hex");
    const eExp = Buffer.from(expected, "hex");
    if (eSig.length !== eExp.length) return { valid: false };
    if (!timingSafeEqual(eSig, eExp)) return { valid: false };
    return { valid: true, role: "super", permissions: ["all"] };
  }

  return { valid: false };
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key)));
  });
  return `${salt}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, "hex");
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key)));
  });
  if (derivedKey.length !== hashBuffer.length) return false;
  return timingSafeEqual(derivedKey, hashBuffer);
}

declare module "express" {
  interface Request {
    adminRole?: AdminRole;
    adminPermissions?: string[];
  }
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
  const result = verifyToken(token);
  if (!result.valid) {
    res.status(401).json({ error: "Session expired or invalid" });
    return;
  }
  req.adminRole = result.role;
  req.adminPermissions = result.permissions;
  next();
}

function superAdminOnly(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction,
) {
  if (req.adminRole !== "super") {
    res.status(403).json({ error: "Super admin access required" });
    return;
  }
  next();
}

// ── Auth ──

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
  const token = generateToken("super", ["all"]);
  logger.info("Super admin login successful");
  res.json({ token, role: "super", permissions: ["all"] });
});

router.post("/team/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }
  try {
    const rows = await db.select().from(teamMembers).where(eq(teamMembers.email, email.toLowerCase().trim()));
    if (rows.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const member = rows[0];
    if (!member.isActive) {
      res.status(401).json({ error: "Account is disabled" });
      return;
    }
    const valid = await verifyPassword(password, member.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = generateToken("member", member.permissions as string[]);
    logger.info({ email }, "Team member login successful");
    res.json({ token, role: "member", name: member.name, permissions: member.permissions });
  } catch (err) {
    logger.error({ err }, "Team login error");
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", authMiddleware, (req, res) => {
  const token = req.headers.authorization?.slice(7);
  if (token) revokedTokens.add(token);
  res.json({ success: true });
});

router.get("/verify", authMiddleware, (req, res) => {
  res.json({ ok: true, role: req.adminRole, permissions: req.adminPermissions });
});

// ── Team Members (super admin only) ──

router.get("/team", authMiddleware, superAdminOnly, async (_req, res) => {
  try {
    const rows = await db
      .select({
        id: teamMembers.id,
        name: teamMembers.name,
        email: teamMembers.email,
        permissions: teamMembers.permissions,
        isActive: teamMembers.isActive,
        createdAt: teamMembers.createdAt,
        updatedAt: teamMembers.updatedAt,
      })
      .from(teamMembers)
      .orderBy(desc(teamMembers.createdAt));
    res.json(rows);
  } catch (err) {
    logger.error({ err }, "Failed to list team members");
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

router.post("/team", authMiddleware, superAdminOnly, async (req, res) => {
  const { name, email, password, permissions } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "name, email, and password are required" });
    return;
  }
  try {
    const passwordHash = await hashPassword(password);
    const rows = await db
      .insert(teamMembers)
      .values({
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        permissions: permissions ?? [],
        isActive: true,
      })
      .returning();
    logger.info({ email }, "Team member created");
    const { passwordHash: _ph, ...safe } = rows[0];
    res.status(201).json(safe);
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "23505") {
      res.status(409).json({ error: "Email already exists" });
    } else {
      logger.error({ err }, "Failed to create team member");
      res.status(500).json({ error: "Failed to create team member" });
    }
  }
});

router.put("/team/:id", authMiddleware, superAdminOnly, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { name, permissions, isActive, password } = req.body;
  try {
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name;
    if (permissions !== undefined) updateData.permissions = permissions;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (password) updateData.passwordHash = await hashPassword(password);
    const rows = await db
      .update(teamMembers)
      .set(updateData)
      .where(eq(teamMembers.id, id))
      .returning();
    if (rows.length === 0) { res.status(404).json({ error: "Team member not found" }); return; }
    logger.info({ id }, "Team member updated");
    const { passwordHash: _ph, ...safe } = rows[0];
    res.json(safe);
  } catch (err) {
    logger.error({ err }, "Failed to update team member");
    res.status(500).json({ error: "Failed to update team member" });
  }
});

router.delete("/team/:id", authMiddleware, superAdminOnly, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
  logger.info({ id }, "Team member deleted");
  res.json({ success: true });
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

// ── Media uploads ──

router.post("/upload", authMiddleware, upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  const url = `/api/uploads/${file.filename}`;
  res.json({ url, filename: file.filename, size: file.size });
});

router.get("/media", authMiddleware, async (_req, res) => {
  try {
    const files = await readdir(UPLOADS_DIR);
    const images = files
      .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
      .sort()
      .reverse()
      .map((filename) => ({
        filename,
        url: `/api/uploads/${filename}`,
        uploadedAt: parseInt(filename.split("_")[0] || "0", 10),
      }));
    res.json(images);
  } catch {
    res.json([]);
  }
});

router.delete("/media/:filename", authMiddleware, async (req, res) => {
  const { filename } = req.params;
  if (!filename || filename.includes("/") || filename.includes("..")) {
    res.status(400).json({ error: "Invalid filename" });
    return;
  }
  const filePath = path.join(UPLOADS_DIR, filename);
  try {
    const { unlink } = await import("fs/promises");
    await unlink(filePath);
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: "File not found" });
  }
});

// ── Certificates ──

router.get("/public/certificate/:certificateId", async (req, res) => {
  const { certificateId } = req.params;
  try {
    const rows = await db
      .select()
      .from(certificates)
      .where(eq(certificates.certificateId, certificateId));
    if (rows.length === 0) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }
    const cert = rows[0];
    res.json({
      certificateId: cert.certificateId,
      name: cert.name,
      role: cert.role,
      issueDate: cert.issueDate,
      status: cert.status,
    });
  } catch {
    res.status(500).json({ error: "Lookup failed" });
  }
});

router.get("/certificates", authMiddleware, async (_req, res) => {
  const rows = await db.select().from(certificates).orderBy(desc(certificates.createdAt));
  res.json(rows);
});

router.post("/certificates", authMiddleware, async (req, res) => {
  const { certificateId, name, email, role, issueDate, status } = req.body;
  if (!certificateId || !name || !role || !issueDate) {
    res.status(400).json({ error: "certificateId, name, role, and issueDate are required" });
    return;
  }
  const existing = await db
    .select()
    .from(certificates)
    .where(eq(certificates.certificateId, certificateId));
  if (existing.length > 0) {
    res.status(409).json({ error: "Certificate ID already exists" });
    return;
  }
  const rows = await db
    .insert(certificates)
    .values({ certificateId, name, email: email || null, role, issueDate, status: status || "verified" })
    .returning();
  logger.info({ certificateId }, "Certificate created");
  res.status(201).json(rows[0]);
});

router.put("/certificates/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { name, email, role, issueDate, status } = req.body;
  const rows = await db
    .update(certificates)
    .set({ name, email: email || null, role, issueDate, status, updatedAt: new Date() })
    .where(eq(certificates.id, id))
    .returning();
  if (rows.length === 0) { res.status(404).json({ error: "Certificate not found" }); return; }
  logger.info({ id }, "Certificate updated");
  res.json(rows[0]);
});

router.delete("/certificates/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(certificates).where(eq(certificates.id, id));
  logger.info({ id }, "Certificate deleted");
  res.json({ success: true });
});

// ── Optimize ──

let optimizeRunning = false;

router.get("/optimize/lock", authMiddleware, superAdminOnly, (_req, res) => {
  res.json({ running: optimizeRunning });
});

router.post("/optimize/precheck", authMiddleware, superAdminOnly, async (_req, res) => {
  const checks: { server: boolean; database: boolean; storage: boolean } = {
    server: true,
    database: false,
    storage: false,
  };
  const issues: string[] = [];

  try {
    await pool.query("SELECT 1");
    checks.database = true;
  } catch {
    issues.push("Database connection failed");
  }

  try {
    await stat(UPLOADS_DIR);
    checks.storage = true;
  } catch {
    try {
      await mkdir(UPLOADS_DIR, { recursive: true });
      checks.storage = true;
    } catch {
      issues.push("Storage directory not accessible");
    }
  }

  res.json({ ok: issues.length === 0, checks, issues });
});

router.post("/optimize/db-analyze", authMiddleware, superAdminOnly, async (req, res) => {
  if (optimizeRunning) { res.status(409).json({ error: "Optimization already in progress" }); return; }
  optimizeRunning = true;
  const { mode = "safe" } = req.body as { mode?: "safe" | "advanced" };
  try {
    if (mode === "advanced") {
      await pool.query("VACUUM ANALYZE");
      res.json({ ok: true, detail: "All tables vacuumed and analyzed" });
    } else {
      await pool.query("ANALYZE");
      res.json({ ok: true, detail: "Query planner statistics refreshed" });
    }
  } catch (err) {
    res.status(500).json({ ok: false, error: "Database analysis failed" });
  } finally {
    optimizeRunning = false;
  }
});

router.post("/optimize/cache-clear", authMiddleware, superAdminOnly, (_req, res) => {
  const tokenCount = revokedTokens.size;
  revokedTokens.clear();
  res.json({ ok: true, detail: `${tokenCount} expired session token${tokenCount === 1 ? "" : "s"} cleared` });
});

router.post("/optimize/db-stats", authMiddleware, superAdminOnly, async (_req, res) => {
  try {
    const [contentRows, leadsRows, certRows, teamRows] = await Promise.all([
      db.select({ n: count() }).from(siteContent).then((r) => Number(r[0]?.n ?? 0)),
      db.select({ n: count() }).from(leads).then((r) => Number(r[0]?.n ?? 0)),
      db.select({ n: count() }).from(certificates).then((r) => Number(r[0]?.n ?? 0)),
      db.select({ n: count() }).from(teamMembers).then((r) => Number(r[0]?.n ?? 0)),
    ]);

    const sizeRows = await pool.query<{ table_name: string; total_size: string }>(
      `SELECT relname AS table_name,
              pg_size_pretty(pg_total_relation_size(relid)) AS total_size
         FROM pg_catalog.pg_statio_user_tables
        ORDER BY pg_total_relation_size(relid) DESC`
    );

    res.json({
      ok: true,
      tables: {
        site_content: contentRows,
        leads: leadsRows,
        certificates: certRows,
        team_members: teamRows,
      },
      sizes: sizeRows.rows,
    });
  } catch {
    res.status(500).json({ ok: false, error: "Could not fetch database stats" });
  }
});

router.post("/optimize/media-audit", authMiddleware, superAdminOnly, async (_req, res) => {
  try {
    let files: string[] = [];
    let totalBytes = 0;

    try {
      files = await readdir(UPLOADS_DIR);
      const IMAGE_RE = /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i;
      const imageFiles = files.filter((f) => IMAGE_RE.test(f));

      for (const f of imageFiles) {
        try {
          const s = await stat(path.join(UPLOADS_DIR, f));
          totalBytes += s.size;
        } catch { /* skip */ }
      }

      res.json({
        ok: true,
        count: imageFiles.length,
        totalKb: Math.round(totalBytes / 1024),
        detail: `${imageFiles.length} media file${imageFiles.length === 1 ? "" : "s"} (${Math.round(totalBytes / 1024)} KB total)`,
      });
    } catch {
      res.json({ ok: true, count: 0, totalKb: 0, detail: "No media files found" });
    }
  } catch {
    res.status(500).json({ ok: false, error: "Media audit failed" });
  }
});

export { authMiddleware };
export default router;
