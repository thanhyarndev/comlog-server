import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  // Tạo session mới
  @Post()
  create(@Body() dto: CreateSessionDto) {
    return this.service.create(dto);
  }

  // Lấy toàn bộ session
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Lấy 1 session theo id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  // Cập nhật danh sách món ăn (items)
  @Put(':id/items')
  updateItems(@Param('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.service.updateItems(id, dto.items || []);
  }

  // Tắt session
  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.service.deactivate(id);
  }
}
