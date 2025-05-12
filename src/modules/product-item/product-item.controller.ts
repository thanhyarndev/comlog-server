import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductItemService } from '../product-item/product-item.service';
import { ProductInfoService } from '../product-info/product-info.service';

@Controller('epc')
export class ProductItemController {
  constructor(
    private readonly productItemService: ProductItemService,
    private readonly productInfoService: ProductInfoService, // ✅ Inject đúng
  ) {}

  @Post()
  create(@Body() body: { epc: string; sku: string }) {
    return this.productItemService.create(body.epc, body.sku);
  }

  @Get()
  findAll() {
    return this.productItemService.findAll();
  }

  @Get(':epc')
  findOne(@Param('epc') epc: string) {
    return this.productItemService.findByEpc(epc);
  }

  @Put(':epc')
  updateCheckout(@Param('epc') epc: string, @Body() body: { isCheckout: boolean }) {
    return this.productItemService.updateCheckoutStatus(epc, body.isCheckout);
  }

  @Delete(':epc')
  remove(@Param('epc') epc: string) {
    return this.productItemService.delete(epc);
  }

  @Get(':epc/detail')
  async getProductInfoByEpc(@Param('epc') epc: string) {
    const item = await this.productItemService.findByEpc(epc);
    if (!item) throw new NotFoundException(`EPC ${epc} không tồn tại`);

    const product = await this.productInfoService.findBySku(item.sku);
    if (!product) throw new NotFoundException(`SKU ${item.sku} không tồn tại`);

    return {
      epc: item.epc,
      sku: item.sku,
      isCheckout: item.isCheckout,
      product: {
        name: product.name,
        price: product.price,
        description: product.description,
      },
    };
  }
}