import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(() => Int, { description: 'primary Key' })
  id: number;

  @Field(() => String, { description: 'name index' })
  name: string;

  @Field(() => String)
  desc: number;
}
