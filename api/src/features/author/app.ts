import { Router} from "express"
import { author, findAuthor, createAuthor, appAuthor, delAuthor } from "./author-controller"
import  admin  from "../../middleware/role";

const router: Router = Router()

router.get('/author', admin, author)
router.post('/author-find', admin, findAuthor)
router.post('/createAuthor', admin, createAuthor)
router.post('/appAuthor/:name', admin, appAuthor)
router.delete('/delAuthor/:name', admin, delAuthor)

export default router
