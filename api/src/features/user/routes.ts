import { Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware/adminMiddleware";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware";
import * as controller from "./controllers/controller";

const router: Router = Router();

router.get("/admin", authMiddleware, adminMiddleware, controller.users);

export default router;
