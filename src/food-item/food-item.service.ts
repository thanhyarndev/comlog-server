// src/food-item/food-item.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodItem, FoodItemDocument } from './schemas/food-item.schema';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';

@Injectable()
export class FoodItemService {
  constructor(
    @InjectModel(FoodItem.name)
    private readonly model: Model<FoodItemDocument>,
  ) {}

  async create(dto: CreateFoodItemDto): Promise<FoodItem> {
    return this.model.create(dto);
  }

  async findAll(): Promise<FoodItem[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<FoodItem> {
    const item = await this.model.findById(id).exec();
    if (!item) throw new NotFoundException('Food item not found');
    return item;
  }

  async update(id: string, dto: UpdateFoodItemDto): Promise<FoodItem> {
    const updated = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Food item not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Food item not found');
  }
}
