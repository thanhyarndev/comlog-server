import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductInfo, ProductInfoSchema } from './product-info.schema';
import { ProductInfoService } from './product-info.service';
import { ProductInfoController } from '../product-info/product-info.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductInfo.name, schema: ProductInfoSchema }]),
  ],
  controllers: [ProductInfoController], // ✅ Phải có dòng này
  providers: [ProductInfoService],
  exports: [ProductInfoService],
})
export class ProductInfoModule {}