import { Router, type IRouter } from "express";
import healthRouter from "./health";
import formsRouter from "./forms";
import adminRouter from "./admin";
import aiSeoRouter from "./ai-seo";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/forms", formsRouter);
router.use("/admin", adminRouter);
router.use("/admin/ai-seo", aiSeoRouter);

export default router;
