import { Router } from "express"
import { user, userFind} from "./user-controller"
import admin from "../../middleware/role";

const router: Router = Router()

router.get('/user',admin, user)
router.post('/findUser', admin, userFind)

export default router