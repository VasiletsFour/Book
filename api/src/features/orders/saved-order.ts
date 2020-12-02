import User from "../shared/db-models/order-models"

export const createOrder = async (order: any) => {

    const newUser = new User({
        date: new Date(),
        user_id: order.user_id,
        items: {
            printing_editions_id: order.items.printing_editions_id,
            count: order.items.count,
        },
        payment_info: order.payment_info
    })

    const savedUser = await newUser.save()

    return savedUser
}
