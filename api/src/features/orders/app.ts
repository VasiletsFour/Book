import { Router} from "express"
import {newOrder, order} from "./oerder-controllers"
import admin from "../../middleware/role";
const router:Router = Router()

router.get('/admin', admin, order)
router.post('/newOrder', newOrder)

export default router