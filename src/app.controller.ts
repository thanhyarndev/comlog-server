import { Controller, Get } from '@nestjs/common';
import { ProductItemService } from './modules/product-item/product-item.service';

@Controller()
export class AppController {
  constructor(private readonly productItemService: ProductItemService) {}

  @Get('test')
  async testInsert() {
    return this.productItemService.create('ABC123456', 'SKU-123');
  }
}
