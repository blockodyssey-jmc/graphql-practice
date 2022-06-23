import { Type } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";


/**
 * @desc 활용법에 대해서 다시 알아봐야됨
 *  */ 
export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
    @Resolver({ isAbstract: true })
    abstract class BaseResolverHost {
      @Query((type) => [classRef], { name: `findAll${classRef.name}` })
      async findAll(): Promise<T[]> {
        return [];
      }
    }
    return BaseResolverHost;
  }