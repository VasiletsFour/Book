import UserModels from "../../../db/models/UserModels";
import { pagination } from "../../../helpers/pagination/pagination";
import { QueryUser } from "../api";

export const users = async ({ page, name }: QueryUser) => {
    try {
        const { start, limit } = pagination(10, Number(page));
        const filter = name && {
            username: {
                $regex: name,
                $options: "i"
            },
            remove_user: false
        };

        const users = await UserModels.find(filter).skip(start).limit(limit);

        return {
            status: 200,
            message: {
                data: users.map((item) => {
                    return {
                        id: item._id,
                        username: item.username,
                        emai: item.email
                    };
                })
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};
