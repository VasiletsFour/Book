import { Request, Response } from "express"
import Editions from "../shared/db-models/editions-models"
import { create } from "./book-service";

export const books = async (req: Request, res: Response) => {
    const page:any = Number(req.params.page) || 1 
    const count = await Math.ceil((await Editions.find()).length/6)
    
    const books = await Editions.find().limit(6).skip(page)

    res.send({books, count}).status(200)
}


export const sortBook = async (req: Request, res: Response) => {
    const word = new RegExp(req.body.word, "i")
    const parms = String(req.body.type)
    const int = Number(req.body.int)
    const minPrice = Number(req.body.min)
    const maxPrice = Number(req.body.max)

    if (parms === "name") {
        const query = await Editions.find({ $or: [{ name: { $regex: word }}, { description: word }] }).sort({ name: int })
        res.json(query)
    }


    if (parms === "price") {
        const query = await Editions.find({price:{$gte:minPrice, $lte:maxPrice}}).sort({ price: int })
        res.json(query)
    }

}

export const addBook = async (req: Request, res: Response) => {
    const service = await create(req.body)

    res.send(service)
}

export const appBook = async (req: Request, res: Response) => {
    await Editions.findOneAndUpdate({ name: req.params.name }, req.body)
        .then(successResponce => {

            if (successResponce) {
                res.send("book app").status(200)
            }

            if (!successResponce) {
                res.send("Something wrong").status(404)
            }
        })
}

export const delBook = async (req: Request, res: Response) => {
    await Editions.findOneAndDelete({ name: req.params.name })

    res.send('delet')
}

// export const delBook = async (req: Request, res: Response) => {
//     await Editions.findOneAndUpdate({ name: req.params.name }, req.body.remove_authors)
//         .then(successResponce => {

//             if (successResponce) {
//                 res.send("Editions del").status(200)
//             }

//             if (!successResponce) {
//                 res.send("Something wrong").status(404)
//             }
//         })
// }
