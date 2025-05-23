import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ExpenseTransaction,
  ExpenseTransactionDocument,
} from './schemas/expense-transaction.schema';
import { Model, Types } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class ExpenseTransactionService {
  constructor(
    @InjectModel(ExpenseTransaction.name)
    private readonly txModel: Model<ExpenseTransactionDocument>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<ExpenseTransaction> {
    const created = new this.txModel({
      ...dto,
      expenseId: new Types.ObjectId(dto.expenseId),
    });
    return created.save();
  }

  async findByExpense(expenseId: string): Promise<ExpenseTransaction[]> {
    return this.txModel.find({ expenseId }).exec();
  }

  async findByFilter(filter: {
    expenseId?: string;
    employeeId?: string;
  }): Promise<ExpenseTransaction[]> {
    const query: any = {};
    if (filter.expenseId)
      query.expenseId = new Types.ObjectId(filter.expenseId);
    if (filter.employeeId) query.employeeId = filter.employeeId;

    return this.txModel.find(query).populate('expenseId').exec();
  }

  async update(
    id: string,
    dto: Partial<CreateTransactionDto>,
  ): Promise<ExpenseTransaction> {
    const updated = await this.txModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Transaction not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.txModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Transaction not found');
  }

  async findByExpenseIds(expenseIds?: string[]): Promise<ExpenseTransaction[]> {
    if (!expenseIds || !Array.isArray(expenseIds) || expenseIds.length === 0) {
      return [];
    }

    const objectIds = expenseIds.map((id) => new Types.ObjectId(id));
    return this.txModel.find({ expenseId: { $in: objectIds } }).exec();
  }
}
