import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ItemRepository } from './item.repository';
import { Item } from './models/item.model';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) { }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const itemId = await this.itemRepository.create(createItemInput)
    return Object.assign(createItemInput, { id: itemId })
  }

  async findAll(): Promise<Array<Item>> {
    return await this.itemRepository.findAll()

  }

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOne(id)
  }

  async update(updateItemInput: UpdateItemInput) {
    const anItem = await this.itemRepository.findOne(updateItemInput.id)

    const { id, ...updateData } = updateItemInput
    const itemDao = new Item()

    for (const property in updateData) {
      if (property != undefined) {
        Object.assign(itemDao, { ["item_" + property]: updateData[property] })
      }
    }

    const changedRows = await this.itemRepository.update(id, itemDao)

    if (changedRows) {
      for (const property in itemDao) {
        Object.assign(anItem, { [property]: itemDao[property] })
      }
    }

    return anItem
  }

  async remove(id: number) {
    const anItem = await this.itemRepository.findOne(id)

    const affectedRows = await this.itemRepository.remove(id)
    if (affectedRows == 0) {
      console.log("DB Item 삭제 실패")
      throw new BadRequestException(`DB Item 정보 삭제 에러 발생`)
    }

    return anItem
  }
}
