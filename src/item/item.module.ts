import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { ItemRepository } from './item.repository';

@Module({
  providers: [ItemResolver, ItemService, ItemRepository]
})
export class ItemModule {}
