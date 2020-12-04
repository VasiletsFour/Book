import { Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware/adminMiddleware";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware";
import * as controller from "./controllers/controller";

const router: Router = Router();

//admin
router.get("/admin", authMiddleware, adminMiddleware, controller.orders);
//user
router.post("/", authMiddleware, controller.create);

export default router;
