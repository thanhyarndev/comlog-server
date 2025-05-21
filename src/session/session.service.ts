import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session, SessionDocument } from './schemas/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async create(data: {
    expenseId: string;
    items: string[];
  }): Promise<Session> {
    const created = new this.sessionModel({
      ...data,
      expenseId: new Types.ObjectId(data.expenseId),
      isActive: true,
    });
    return created.save();
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
