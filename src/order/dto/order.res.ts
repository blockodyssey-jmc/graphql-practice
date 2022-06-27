import { InternalServerErrorException } from "@nestjs/common"
import { Item } from "src/item/models/item.model"
import { User } from "src/user/models/user.model"
import { Order } from "../models/order.model"

export function ObjectToDTO(orders: any): Order {

    try {
        const anUser = new User()
        Object.assign(anUser, {
            id: orders.user_id,
            name: orders.user_name,
            age: orders.user_age
        })

        const anItem = new Item()
        Object.assign(anItem, {
            id: orders.item_id,
            name: orders.item_name
        })

        const anOrder = new Order()

        Object.assign(anOrder, {
            id: orders.order_id,
            item: anItem,
            user: anUser,
            orderDate: orders.order_date
        })

        return anOrder


    } catch (e) {
        console.log("orders 매핑에러 발생 : ", e)
        throw new InternalServerErrorException(`orders 매핑에러 발생`)
    }
}