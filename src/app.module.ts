import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductInfoModule } from './modules/product-info/product-info.module';
import { ProductItemModule } from './modules/product-item/product-item.module';
import { EmployeeModule } from './employee/employee.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    ProductInfoModule,
    ProductItemModule,
    EmployeeModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}