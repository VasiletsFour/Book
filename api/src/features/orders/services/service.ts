import { isValidated } from "../../../helpers/validate/validate";
import { logger } from "../../utils/logger";
import { CreateOrder } from "../api";
import * as rpositore from "../repositories/repositorie";
import OrderSchema from "../Schema/OrderSchema.json";

export const create = async (order: CreateOrder, auth:string) => {
    logger.info(`>>>> orderService.create order = ${order.transaction_id}`);
    const validate = isValidated(order, OrderSchema);
    
    if (!validate.valid) {
        logger.error(`create Order, error: ${validate.errors}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await rpositore.create(order, auth);
};

export const orders = async (page:number,id?:string) => {
    logger.info(`>>>> orderService.Orders: qury = ${id} ${page}`);
    
    return await rpositore.orders(page, id);
};

