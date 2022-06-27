import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderRepository } from './order.repository';
import { ItemRepository } from 'src/item/item.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  providers: [OrderResolver, OrderService, OrderRepository,ItemRepository, UserRepository]
})
export class OrderModule { }
