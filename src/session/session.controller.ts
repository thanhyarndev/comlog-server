import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { CreateSessionWithExpenseDto } from './dto/create-session-with-expense.dto';
import { Session } from './schemas/session.schema';

@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  // ✅ Tạo session đơn lẻ (đã có expense)
  @Post()
  create(@Body() dto: CreateSessionDto) {
    return this.service.create(dto);
  }

  // ✅ Tạo session + expense đồng thời
  @Post('/with-expense')
  async createWithExpense(
    @Body() dto: CreateSessionWithExpenseDto,
  ): Promise<Session> {
    return this.service.createSessionWithExpense(dto);
  }

  // ✅ Lấy toàn bộ session
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ✅ Lấy 1 session theo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  // ✅ Cập nhật danh sách món ăn (items)
  @Put(':id/items')
  updateItems(@Param('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.service.updateItems(id, dto.items || []);
  }

  // ✅ Deactivate session
  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.service.deactivate(id);
  }
}
