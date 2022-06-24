import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  desc: number;
}
