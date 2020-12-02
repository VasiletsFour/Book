import Author from "../shared/db-models/author-models"

export const createAuthor = async (author: any) => {
    
    const newAuthor = new Author({
        name: author.name
    })

    const savedAuthor = await newAuthor.save()

    return savedAuthor
}