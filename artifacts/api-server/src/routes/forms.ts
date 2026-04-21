import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email and message are required" });
    return;
  }
  logger.info({ name, email, company }, "Contact form submission");
  res.json({ success: true, message: "Thank you! We will be in touch within 24 hours." });
});

router.post("/creators", (req, res) => {
  const { name, email, niche, handle, monthlyViews } = req.body;
  if (!name || !email || !niche) {
    res.status(400).json({ error: "name, email and niche are required" });
    return;
  }
  logger.info({ name, email, niche, handle, monthlyViews }, "Creator onboarding submission");
  res.json({ success: true, message: "Welcome! We will review your application and reach out within 48 hours." });
});

router.post("/freelancers", (req, res) => {
  const { name, email, skills, portfolioUrl, experience } = req.body;
  if (!name || !email || !skills) {
    res.status(400).json({ error: "name, email and skills are required" });
    return;
  }
  logger.info({ name, email, skills, portfolioUrl, experience }, "Freelancer application submission");
  res.json({ success: true, message: "Application received! We review applications weekly and will be in touch." });
});

export default router;
