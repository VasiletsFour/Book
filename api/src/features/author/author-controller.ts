import { Request, Response } from "express"
import { create } from "./author-service";
import Author from "../shared/db-models/author-models"



export const author = async (req: Request, res: Response) => {
    const allAuthor: object = await Author.find().sort({ name: 1 })

    res.json(allAuthor)
}

export const findAuthor = async (req: Request, res: Response) => {
    const word = new RegExp (req.body.word, "i")
    const query = await Author.find({ name: { $regex: word } }).sort({name:1})     
    
    res.send(query)
}

export const createAuthor = async (req: Request, res: Response) => {
    const answear = await create(req.body)

    res.json(answear)
}

export const appAuthor = async (req: Request, res: Response) => {
    await Author.findOneAndUpdate({ name: req.params.name }, req.body)
        .then(successResponce => {
    
            if (successResponce) {
                res.send("Author app").status(200)
            }
    
            if (!successResponce) {
                res.send("Something wrong").status(404)
            }
        })
}

export const delAuthor = async (req: Request, res: Response) => {
    await Author.findOneAndDelete({ name: req.params.name })
        .then(successResponce => {
    
            if (successResponce) {
                res.send("Author del").status(200)
            }
    
            if (!successResponce) {
                res.send("Something wrong").status(404)
            }
        })
}
// export const delAuthor = async (req: Request, res: Response) => {
//     await Author.findOneAndUpdate({ name: req.params.name }, req.body.remove_authors)
//         .then(successResponce => {
    
//             if (successResponce) {
//                 res.send("Author del").status(200)
//             }
    
//             if (!successResponce) {
//                 res.send("Something wrong").status(404)
//             }
//         })
// }

