import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2/promise';
import { DataSource } from 'typeorm';
import { CreateItemInput } from './dto/create-item.input';
import { Item } from './models/item.model';

@Injectable()
export class ItemRepository {
    constructor(private readonly ds: DataSource) { }

    async create(createItemInput: CreateItemInput) {
        try {
            const result = await this.ds.query("INSERT INTO items (item_name, item_desc) VALUES (?,?)", [createItemInput.name, createItemInput.desc])
            return result.insertId
        } catch (e) {
            console.log("DB item 저장 에러 발생 ", e)
            throw new ConflictException(`DB item 정보 저장 에러 발생`)
        }
    }

    async findAll() {
        try {
            const result = await this.ds.query("SELECT i.item_name AS `name`, i.item_desc AS `desc` FROM items i")
            if (!result.length) {
                console.log("DB items 데이터 없음")
                throw new NotFoundException(`DB items 데이터 없음`)
            }
            return result
        } catch (e) {
            console.log("DB items 조회 에러 발생 ", e)
            throw new ConflictException(`DB items 정보 조회 에러 발생`)
        }
    }
    async findOne(id: number): Promise<Item> {
        try {
            const result = await this.ds.query("SELECT i.id, i.item_name `name`, i.item_desc `desc` FROM items i WHERE id = ?", [id])
            if (result[0] == null) {
                console.log("DB Item 데이터 없음")
                throw new NotFoundException(`DB Item 데이터 없음`)
            }
            return result[0]
        } catch (e) {
            console.log("DB Item 조회 에러 발생 ", e)
            throw new ConflictException(`DB Item 정보 조회 에러 발생`)
        }
    }

    async update(id: number, itemDao: Item) {
        try {
            const sql = `UPDATE items SET ? WHERE id = ?`
            const result: ResultSetHeader = await this.ds.query(sql, [itemDao, id])
            return result.changedRows
        } catch (e) {
            console.log("DB Item 저장 에러 발생 ", e)
            throw new ConflictException(`DB User 정보 저장 에러 발생`)
        }
    }

    async remove(id: number) {
        try {
            const sql = `DELETE FROM items WHERE id = ?`

            const result: ResultSetHeader = await this.ds.query(sql, [id])
            return result.affectedRows
        } catch (e) {
            console.log("DB User 삭제 에러 발생 ", e)
            throw new ConflictException(`DB User 정보 삭제 에러 발생`)
        }
    }
}
