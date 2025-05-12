import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductInfoService } from './product-info.service';

@Controller('product')
export class ProductInfoController {
  constructor(private readonly productInfoService: ProductInfoService) {}

  @Post()
  create(@Body() body: any) {
    return this.productInfoService.create(body);
  }

  @Get()
  findAll() {
    return this.productInfoService.findAll();
  }

  @Get(':sku')
  findOne(@Param('sku') sku: string) {
    return this.productInfoService.findBySku(sku);
  }

  @Put(':sku')
  update(@Param('sku') sku: string, @Body() body: any) {
    return this.productInfoService.update(sku, body);
  }

  @Delete(':sku')
  remove(@Param('sku') sku: string) {
    return this.productInfoService.delete(sku);
  }
}