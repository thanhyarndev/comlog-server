// src/food-item/food-item.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodItem, FoodItemSchema } from './schemas/food-item.schema';
import { FoodItemService } from './food-item.service';
import { FoodItemController } from './food-item.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodItem.name, schema: FoodItemSchema },
    ]),
  ],
  controllers: [FoodItemController],
  providers: [FoodItemService],
})
export class FoodItemModule {}
