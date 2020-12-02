import { Router } from "express";
import * as controller from "./controllers/controller";

const router: Router = Router();

//admin
router.get("/admin", controller.orders);
//user
router.post("/newOrder", controller.create);

export default router;
