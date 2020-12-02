import { Router} from "express"
import * as controller from "./controllers/controller"

const router: Router = Router()

router.get('/', controller.authors)
//admin
router.post('/',  controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.del)

export default router
