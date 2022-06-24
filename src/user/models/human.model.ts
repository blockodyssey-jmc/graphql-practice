import { Field, InterfaceType, ObjectType } from "@nestjs/graphql";

/** interface TEST  */
@InterfaceType()
export abstract class Character {
  @Field(()=> String)
  id : String;

  @Field(()=> String)
  name : String;
}

@ObjectType({
  implements: () => [Character],
})
export class Human implements Character {
  id: string;
  name: string;
}