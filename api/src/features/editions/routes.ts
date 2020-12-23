import { Router } from "express";
import { adminMiddleware } from "../../middleware/adminMiddleware/adminMiddleware";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware";
import * as controller from "./controllers/controller";

const router: Router = Router();

router.get("/", controller.books);
router.get("/:id", controller.book);
router.post("/shoping", controller.shoping);
//admin
router.post("/admin", authMiddleware, adminMiddleware, controller.create);
router.put("/admin/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/admin/:id", authMiddleware, adminMiddleware, controller.delBook);

export default router;
