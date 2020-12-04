import { Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware";
import { authMiddleware } from "../../middleware/authMiddleware";
import * as controller from "./controllers/controller";

const router: Router = Router();

router.get("/", authMiddleware, controller.authors);
//admin
router.post("/", authMiddleware, adminMiddleware, controller.create);
router.put("/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/:id", authMiddleware, adminMiddleware, controller.del);

export default router;
