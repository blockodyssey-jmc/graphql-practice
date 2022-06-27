import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  itemId: number;

  @Field(() => Int)
  userId: number;
}
