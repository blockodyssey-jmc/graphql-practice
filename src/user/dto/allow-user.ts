import { Field, InputType, registerEnumType } from "@nestjs/graphql";

/** enum TEST  */
export enum HelpMe {
    RED = "RED", GREEN= "GREEN", BLUE= "BLUE", BLACK = "BLACK"
}

registerEnumType(HelpMe, { name: 'HelpMe' });

@InputType()
export class AUser {
    @Field(() => HelpMe)
    helpme: HelpMe;
}

