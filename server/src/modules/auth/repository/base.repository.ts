import { Model, Document, FilterQuery } from "mongoose";
import { IRepository } from "./interface";

export class BaseRepository<T extends Document> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = await this.model.create(data);
    return doc;
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, update: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(id).exec();
    return !!res;
  }

  async find(filter: FilterQuery<T> = {}, options: any = {}): Promise<T[]> {
    const q = this.model.find(filter);
    if (options.sort) q.sort(options.sort);
    if (options.limit) q.limit(options.limit);
    if (options.skip) q.skip(options.skip);
    return q.exec();
  }
}
