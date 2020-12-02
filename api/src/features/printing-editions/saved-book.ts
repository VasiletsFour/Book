import Editions from "../../db/models/EditionsModels"

export const createBook = async (book: any) => {

    const editions = new Editions({
            name: book.name,
            description: book.description,
            type: book.type,
            price: book.price,
            currency: book.currency,
            author_id: book.author_id,
    })

    const savedBook = await editions.save()

    return savedBook
}