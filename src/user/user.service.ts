import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const userId = await this.userRepository.create(createUserInput)
    const anUser = new User()
    anUser.name = createUserInput.name
    anUser.age = createUserInput.age
    anUser.address = createUserInput.address
    anUser.email = createUserInput.email
    anUser.id = userId

    return anUser;
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.findAll()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneById(id)
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const anUser = await this.userRepository.findOneById(updateUserInput.id)

    const changedRows = await this.userRepository.update(updateUserInput)

    if (changedRows) {
      Object.assign(anUser, { ...updateUserInput })
    }

    return anUser
  }

  async remove(id: number): Promise<User> {
    const anUser = await this.userRepository.findOneById(id)

    const affectedRows = await this.userRepository.delete(id)
    if (affectedRows == 0) {
      console.log("DB User 삭제 실패")
      throw new BadRequestException(`DB User 정보 삭제 에러 발생`)
    }

    return anUser
  }
}
