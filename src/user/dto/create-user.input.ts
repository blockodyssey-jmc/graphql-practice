import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  email: string;
}
