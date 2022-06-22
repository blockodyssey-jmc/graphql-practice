import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'primary Key' })
  id: number;

  @Field(() => String, { description: 'name index' })
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  email: string;
}
