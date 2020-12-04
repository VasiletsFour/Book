import { Router } from "express";
import * as controller from "./controllers/controller";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware";
import { adminMiddleware } from "../../middleware/adminMiddleware/adminMiddleware";

const router: Router = Router();

router.get("/", controller.books);
//admin
router.post("/admin", authMiddleware, adminMiddleware, controller.create);
router.put("/admin/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/admin/:id", authMiddleware, adminMiddleware, controller.delBook);

export default router;
