import { Router } from "express"
import { books,sortBook, addBook, appBook, delBook } from "./book"
import admin from "../../middleware/role";

const router: Router = Router()

router.get('/:page', books)
router.post('/sort', sortBook)
router.post('/admin/createBook', admin, addBook)
router.put('/admin/appBook/:name', admin, appBook)
router.delete('/admin/delBook/:name', admin, delBook)

export default router
