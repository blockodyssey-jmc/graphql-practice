import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Item } from 'src/item/models/item.model';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Order {
  @Field(() => Int, { description: 'primary Key' })
  id: number;

  @Field(()=> Item, {description : 'item'})
  item : Item

  @Field(()=> User, {description : 'user'})
  user : User

  @Field(() => Date)
  orderDate: Date;
}
