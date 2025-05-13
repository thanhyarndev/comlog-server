import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './schemas/expense.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private expenseModel: Model<ExpenseDocument>,
  ) {}

  async create(dto: CreateExpenseDto): Promise<Expense> {
    const created = new this.expenseModel(dto);
    return created.save();
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  async findOne(id: string): Promise<Expense> {
    const found = await this.expenseModel.findById(id).exec();
    if (!found) throw new NotFoundException('Expense not found');
    return found;
  }

  async update(id: string, dto: UpdateExpenseDto): Promise<Expense> {
    const updated = await this.expenseModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Expense not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.expenseModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Expense not found');
  }
}
