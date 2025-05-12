import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductItem, ProductItemSchema } from './product-item.schema';
import { ProductItemService } from './product-item.service';
import { ProductItemController } from './product-item.controller';
import { ProductInfoModule } from '../product-info/product-info.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductItem.name, schema: ProductItemSchema }]),
    ProductInfoModule,
  ],
  controllers: [ProductItemController],
  providers: [ProductItemService],
  exports: [ProductItemService], // ✅ Thêm dòng này để AppModule có thể inject
})
export class ProductItemModule {}
