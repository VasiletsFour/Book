import { Router } from "express";
import * as controller from "./controllers/controller";

const router: Router = Router();

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);

export default router;
