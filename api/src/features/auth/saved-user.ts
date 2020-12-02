import User from "../shared/db-models/user-models"

export const createUser = async (user: any) => {

    const newUser = new User({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
    })

    newUser.password = await newUser.encryptPassword(newUser.password)
    
    const savedUser = await newUser.save()

    return savedUser
}