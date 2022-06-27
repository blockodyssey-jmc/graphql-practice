import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findOne(id);
  }
}
