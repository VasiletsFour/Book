import { logger } from "../../utils/logger";
import { QueryUser } from "../api";
import * as rpositore from "../repositories/repositorie";

export const users = async (query: QueryUser) => {
    logger.info(`>>>> usersService.Users`);

    return await rpositore.users(query);
};
