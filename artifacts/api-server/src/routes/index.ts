import { Router, type IRouter } from "express";
import healthRouter from "./health";
import formsRouter from "./forms";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/forms", formsRouter);
router.use("/admin", adminRouter);

export default router;
