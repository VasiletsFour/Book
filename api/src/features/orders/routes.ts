import { Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware";
import { authMiddleware } from "../../middleware/authMiddleware";
import * as controller from "./controllers/controller";

const router: Router = Router();

//admin
router.get("/admin", authMiddleware, adminMiddleware, controller.orders);
//user
router.post("/newOrder", authMiddleware, controller.create);

export default router;
