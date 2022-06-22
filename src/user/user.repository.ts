import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ResultSetHeader } from "mysql2";
import { DataSource, Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./models/user.model";

@Injectable()
export class UserRepository {
    constructor(
        private readonly ds: DataSource
    ) { }

    async findAll(): Promise<Array<User>> {
        try {
            const result = await this.ds.query("SELECT * FROM users")
            if (!result.length) {
                console.log("DB Users 데이터 없음")
                throw new NotFoundException(`DB Users 데이터 없음`)
            }
            return result
        } catch (e) {
            console.log("DB Users 조회 에러 발생 ", e)
            throw new ConflictException(`DB Users 정보 조회 에러 발생`)
        }
    }

    async findOneById(id: number): Promise<User> {
        try {
            const result = await this.ds.query("SELECT * FROM users WHERE id = ?", [id])
            if (result[0] == null) {
                console.log("DB User 데이터 없음")
                throw new NotFoundException(`DB User 데이터 없음`)
            }
            return result[0]
        } catch (e) {
            console.log("DB User 조회 에러 발생 ", e)
            throw new ConflictException(`DB User 정보 조회 에러 발생`)
        }
    }

    async create(createUserInput: CreateUserInput): Promise<number> {
        try {
            const result = await this.ds.query("INSERT INTO users (name,age,address,email) VALUES (?,?,?,?)", [createUserInput.name, createUserInput.age, createUserInput.address, createUserInput.email])
            return result.id
        } catch (e) {
            console.log("DB User 저장 에러 발생 ", e)
            throw new ConflictException(`DB User 정보 저장 에러 발생`)
        }
    }

    async update(updateUserInput: UpdateUserInput): Promise<number> {
        try {
            const { id, ...updateData } = updateUserInput

            const sql = `UPDATE users SET ? WHERE id = ?`
            const result: ResultSetHeader = await this.ds.query(sql, [updateData, id])
            console.log("update result", result)
            return result.changedRows
        } catch (e) {
            console.log("DB User 저장 에러 발생 ", e)
            throw new ConflictException(`DB User 정보 저장 에러 발생`)
        }
    }

    async delete(id: number) {
        try {
            const sql = `DELETE FROM users WHERE id = ?`

            const result: ResultSetHeader = await this.ds.query(sql, [id])
            console.log("update result", result)

            return result.affectedRows
        } catch (e) {
            console.log("DB User 삭제 에러 발생 ", e)
            throw new ConflictException(`DB User 정보 삭제 에러 발생`)

        }
    }
}