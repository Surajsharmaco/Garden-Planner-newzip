import { Router } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";
import { db, leads } from "@workspace/db";

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "GrowitBuddy <onboarding@resend.dev>";
const TO = process.env.NOTIFY_EMAIL || "hello@growitbuddy.com";

async function saveLead(type: string, name: string | undefined, email: string, data: Record<string, unknown>) {
  try {
    await db.insert(leads).values({ type, name: name || null, email, data });
  } catch (err) {
    logger.error(err, "Failed to save lead to DB");
  }
}

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 0;color:#888;font-size:13px;width:160px;vertical-align:top;font-family:Inter,sans-serif;border-bottom:1px solid #f0f0f0">${label}</td>
    <td style="padding:10px 0;color:#0B0B0B;font-size:14px;vertical-align:top;font-family:Inter,sans-serif;border-bottom:1px solid #f0f0f0"><strong>${value}</strong></td>
  </tr>`;
}

function emailTemplate(title: string, badge: string, tableRows: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body style="margin:0;padding:0;background:#F7F7F5;font-family:Inter,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;border:1.5px solid rgba(11,11,11,0.08)">
  <tr><td style="background:#0B0B0B;padding:28px 36px">
    <span style="font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.03em">GrowitBuddy</span>
    <span style="display:inline-block;margin-left:12px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:4px 10px;border-radius:100px">${badge}</span>
  </td></tr>
  <tr><td style="padding:32px 36px 8px">
    <p style="margin:0 0 24px;font-size:22px;font-weight:800;color:#0B0B0B;letter-spacing:-0.03em">${title}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1.5px solid rgba(11,11,11,0.08)">
      ${tableRows}
    </table>
  </td></tr>
  <tr><td style="padding:24px 36px 36px">
    <p style="margin:0;font-size:12px;color:#aaa;font-family:Inter,sans-serif">This notification was sent automatically from your GrowitBuddy website.</p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

router.post("/contact", async (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email and message are required" });
    return;
  }
  logger.info({ name, email, company }, "Contact form submission");

  await saveLead("contact", name, email, { name, email, company, message });

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Contact: ${name}`,
      html: emailTemplate(
        "New Contact Form Submission",
        "Contact",
        row("Name", name) +
        row("Email", email) +
        row("Company", company) +
        row("Message", message)
      ),
      replyTo: email,
    });
  } catch (err) {
    logger.error(err, "Resend error (contact)");
  }

  res.json({ success: true, message: "Thank you! We will be in touch within 24 hours." });
});

router.post("/creators", async (req, res) => {
  const { name, email, phone, niche, handle, monthlyViews, goals } = req.body;
  if (!name || !email || !niche) {
    res.status(400).json({ error: "name, email and niche are required" });
    return;
  }
  logger.info({ name, email, niche }, "Creator onboarding submission");

  await saveLead("creator", name, email, { name, email, phone, niche, handle, monthlyViews, goals });

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Creator Application: ${name}`,
      html: emailTemplate(
        "New Creator Application",
        "Creators",
        row("Name", name) +
        row("Email", email) +
        row("Phone", phone) +
        row("Niche / Topic", niche) +
        row("Social Handle", handle) +
        row("Monthly Views / Reach", monthlyViews) +
        row("Goals", goals)
      ),
      replyTo: email,
    });
  } catch (err) {
    logger.error(err, "Resend error (creators)");
  }

  res.json({ success: true, message: "Welcome! We will review your application and reach out within 48 hours." });
});

router.post("/page-owner", async (req, res) => {
  const { name, email, phone, niche, monthlyViews, pageCount, pages } = req.body;
  if (!name || !email || !niche) {
    res.status(400).json({ error: "name, email and niche are required" });
    return;
  }
  logger.info({ name, email, niche, pageCount }, "Page owner application submission");

  const pagesArr: { name: string; link: string }[] = Array.isArray(pages) ? pages : [];
  const pagesText = pagesArr.map((p, i) => `${i + 1}. ${p.name || "(unnamed)"} — ${p.link || "(no link)"}`).join("<br/>");

  await saveLead("page", name, email, { name, email, phone, niche, monthlyViews, pageCount, pages: pagesArr });

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Page Owner Application: ${name}`,
      html: emailTemplate(
        "New Page Owner Application",
        "Page Owner",
        row("Name", name) +
        row("Email", email) +
        row("Phone", phone) +
        row("Niche", niche) +
        row("Monthly Views / Reach", monthlyViews) +
        row("Pages Owned", pageCount) +
        (pagesText ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;width:160px;vertical-align:top;font-family:Inter,sans-serif;border-bottom:1px solid #f0f0f0">Pages</td><td style="padding:10px 0;color:#0B0B0B;font-size:14px;vertical-align:top;font-family:Inter,sans-serif;border-bottom:1px solid #f0f0f0">${pagesText}</td></tr>` : "")
      ),
      replyTo: email,
    });
  } catch (err) {
    logger.error(err, "Resend error (page-owner)");
  }

  res.json({ success: true, message: "Your application has been received. Our team will review and get back to you." });
});

router.post("/freelancers", async (req, res) => {
  const { name, email, phone, skills, portfolioUrl, experience, otherSkill } = req.body;
  if (!name || !email || !skills) {
    res.status(400).json({ error: "name, email and skills are required" });
    return;
  }
  logger.info({ name, email, skills }, "Freelancer application submission");

  const skillsList = Array.isArray(skills) ? skills.join(", ") : skills;
  await saveLead("freelancer", name, email, { name, email, phone, skills: skillsList, otherSkill, experience, portfolioUrl });

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Freelancer Application: ${name}`,
      html: emailTemplate(
        "New Freelancer Application",
        "Freelancers",
        row("Name", name) +
        row("Email", email) +
        row("Phone", phone) +
        row("Skills", skillsList) +
        (otherSkill ? row("Other Skill (specified)", otherSkill) : "") +
        row("Experience", experience) +
        row("Portfolio / Work URL", portfolioUrl)
      ),
      replyTo: email,
    });
  } catch (err) {
    logger.error(err, "Resend error (freelancers)");
  }

  res.json({ success: true, message: "Application received! We review applications weekly and will be in touch." });
});

router.post("/full-time", async (req, res) => {
  const { name, email, phone, role, experience, linkedinUrl, coverNote, otherRole } = req.body;
  if (!name || !email || !role) {
    res.status(400).json({ error: "name, email and role are required" });
    return;
  }
  logger.info({ name, email, role }, "Full-time application submission");

  const roleDisplay = role === "Other" && otherRole ? `Other — ${otherRole}` : role;
  await saveLead("full-time", name, email, { name, email, phone, role: roleDisplay, experience, linkedinUrl, coverNote });

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Full-Time Application: ${name} — ${roleDisplay}`,
      html: emailTemplate(
        "New Full-Time Job Application",
        "Full Time",
        row("Name", name) +
        row("Email", email) +
        row("Phone", phone) +
        row("Role Applied For", roleDisplay) +
        row("Experience", experience) +
        row("LinkedIn / Portfolio", linkedinUrl) +
        row("Cover Note", coverNote)
      ),
      replyTo: email,
    });
  } catch (err) {
    logger.error(err, "Resend error (full-time)");
  }

  res.json({ success: true, message: "Application received! We will review and respond within 7 business days." });
});

router.post("/newsletter", async (req, res) => {
  const { email, source } = req.body;
  if (!email) {
    res.status(400).json({ error: "email is required" });
    return;
  }
  logger.info({ email, source }, "Newsletter signup");

  await saveLead("newsletter", undefined, email, { email, source: source || "Authority Audit" });

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Newsletter Signup: ${email}`,
      html: emailTemplate(
        "New Newsletter Subscriber",
        "Newsletter",
        row("Email", email) +
        row("Source", source || "Authority Audit")
      ),
    });
  } catch (err) {
    logger.error(err, "Resend error (newsletter)");
  }

  res.json({ success: true });
});

export default router;
