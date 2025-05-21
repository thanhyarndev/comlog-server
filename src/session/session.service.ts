import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session, SessionDocument } from './schemas/session.schema';
import { Expense, ExpenseDocument } from '@/expense/schemas/expense.schema';


@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,

    @InjectModel(Expense.name)
    private readonly expenseModel: Model<ExpenseDocument>,
  ) {}

  async create(data: { expenseId: string; items: string[] }): Promise<Session> {
    const created = new this.sessionModel({
      ...data,
      expenseId: new Types.ObjectId(data.expenseId),
      isActive: true,
    });
    return created.save();
  }

  async createSessionWithExpense(data: {
    title: string;
    date: string;
    items: string[];
    tagIds?: string[]; // ✅ thêm tagIds
  }): Promise<Session> {
    const expense = await this.expenseModel.create({
      title: data.title,
      date: data.date,
      notes: 'Session tự động tạo',
      isSessionBased: true,
      tagIds: data.tagIds || [], // ✅ gắn tagIds
    });

    const session = await this.sessionModel.create({
      expenseId: expense._id,
      items: data.items,
      isActive: true,
    });

    await this.expenseModel.findByIdAndUpdate(expense._id, {
      sessionId: session._id,
    });

    return session;
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findById(id: string): Promise<Session> {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async deactivate(id: string): Promise<void> {
    await this.sessionModel.findByIdAndUpdate(id, { isActive: false });
  }

  async updateItems(id: string, items: string[]): Promise<Session> {
    return this.sessionModel.findByIdAndUpdate(id, { items }, { new: true });
  }
}
