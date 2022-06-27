import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Order } from "./models/order.model";

@Injectable()
export class OrderRepository {
    constructor(private readonly ds: DataSource) { }

    async create(orderDao: Order) {
        try {
            let sql = "INSERT INTO orders (item_id, user_id, order_date) VALUES (?,?,?)"
            const result = await this.ds.query(sql, [orderDao.item.id, orderDao.user.id, orderDao.orderDate])
            return result.insertId
        } catch (e) {
            console.log("DB order 저장 에러 발생 ", e)
            throw new ConflictException(`DB order 저장 에러 발생`)
        }
    }

    async findAll() {
        try {
            let sql = "SELECT o.id order_id, o.order_date, i.id item_id, i.item_name, u.id user_id, u.name user_name, u.age user_age FROM orders o, users u, items i WHERE o.item_id = i.id AND o.user_id = i.id"
            const result = await this.ds.query(sql)
            if (!result.length) {
                console.log("DB orders 데이터 없음")
                throw new NotFoundException(`DB orders 데이터 없음`)
            }
            return result
        } catch (e) {
            console.log("DB orders 조회 에러 발생 ", e)
            throw new ConflictException(`DB orders 정보 조회 에러 발생`)
        }
    }

    async findOne(id: number) {
        try {
            let sql = "SELECT o.id order_id, o.order_date, i.id item_id, i.item_name, u.id user_id, u.name user_name, u.age user_age FROM orders o, users u, items i WHERE o.item_id = i.id AND o.user_id = i.id AND o.id = ?"
            const result = await this.ds.query(sql, [id])
            if (!result.length) {
                console.log("DB order 데이터 없음")
                throw new NotFoundException(`DB order 데이터 없음`)
            }
            return result[0]
        } catch (e) {
            console.log("DB order 조회 에러 발생 ", e)
            throw new ConflictException(`DB order 정보 조회 에러 발생`)
        }
    }
}