import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/item/item.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateOrderInput } from './dto/create-order.input';
import { ObjectToDTO } from './dto/order.res';
import { Order } from './models/order.model';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly itemRepository: ItemRepository
  ) { }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const anUser = await this.userRepository.findOneById(createOrderInput.userId)
    const anItem = await this.itemRepository.findOne(createOrderInput.itemId)

    const orderDao = new Order()
    orderDao.item = anItem
    orderDao.user = anUser
    orderDao.orderDate = new Date()

    const orderId = await this.orderRepository.create(orderDao)

    orderDao.id = orderId
    return orderDao
  }

  async findAll(): Promise<Array<Order>> {
    const orders: Array<any> = await this.orderRepository.findAll()

    const result: Array<Order> = []
    for (let i = 0; i < orders.length; i++) {
      const anOrder = ObjectToDTO(orders[i])

      result.push(anOrder)
    }

    return result
  }

  async findOne(id: number) {
    const anOrder = await this.orderRepository.findOne(id)

    const result = ObjectToDTO(anOrder)
    return result
  }
}
