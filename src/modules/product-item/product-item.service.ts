import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductItem, ProductItemDocument } from './product-item.schema';
import { ProductInfoService } from '../product-info/product-info.service';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectModel(ProductItem.name) private productItemModel: Model<ProductItemDocument>,
    private productInfoService: ProductInfoService
  ) {}

  async create(epc: string, sku: string): Promise<ProductItem> {
    const product = await this.productInfoService.findBySku(sku);
    if (!product) throw new NotFoundException('SKU không tồn tại');
    return this.productItemModel.create({ epc, sku });
  }

  async findAll(): Promise<ProductItem[]> {
    return this.productItemModel.find();
  }

  async findByEpc(epc: string): Promise<ProductItem> {
    return this.productItemModel.findOne({ epc });
  }

  async updateCheckoutStatus(epc: string, isCheckout: boolean): Promise<ProductItem> {
    return this.productItemModel.findOneAndUpdate(
      { epc },
      { isCheckout },
      { new: true }
    );
  }

  async delete(epc: string) {
    return this.productItemModel.deleteOne({ epc });
  }
}