import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AdminGuard } from './guards/admin.guard';

const ADMIN_TOKEN = 'secure-admin-token-560013'; // có thể thay bằng uuid or hash + secret

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get('/whoami')
  whoami(@Req() req: Request) {
    const token = req.cookies['admin_token'];
    return { role: token === ADMIN_TOKEN ? 'admin' : 'guest' };
  }

  @Post('/login-pin')
  loginWithPin(
    @Body() body: { pin: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (body.pin === '560013') {
      res.cookie('admin_token', ADMIN_TOKEN, {
        httpOnly: true,
        secure: false, // đổi thành true nếu dùng HTTPS
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 6, // 6 tiếng
      });
      return { success: true };
    }
    throw new UnauthorizedException('Mã PIN không hợp lệ');
  }

  @Get('/admin-only')
  @UseGuards(AdminGuard)
  secretForAdmin() {
    return { message: 'Chỉ admin mới thấy được nội dung này!' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
