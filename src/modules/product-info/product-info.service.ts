import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInfo, ProductInfoDocument } from './product-info.schema';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectModel(ProductInfo.name) private productInfoModel: Model<ProductInfoDocument>,
  ) {}

  async create(data: Partial<ProductInfo>): Promise<ProductInfo> {
    return this.productInfoModel.create(data);
  }

  async findAll(): Promise<ProductInfo[]> {
    return this.productInfoModel.find();
  }

  async findBySku(sku: string): Promise<ProductInfo> {
    return this.productInfoModel.findOne({ sku });
  }

  async update(sku: string, update: Partial<ProductInfo>): Promise<ProductInfo> {
    return this.productInfoModel.findOneAndUpdate({ sku }, update, { new: true });
  }

  async delete(sku: string) {
    return this.productInfoModel.deleteOne({ sku });
  }
}
