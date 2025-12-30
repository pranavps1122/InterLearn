import { BaseRepository } from "./base.repository";
import UserModel from "../models/auth.model"
import { IUser } from "../types/auth.interface";
import { FilterQuery } from "mongoose";
export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email }).lean().exec();
  }
  
  async findAdminByEmail(email:string){
    return this.model.findOne({email,role:'admin'}).lean().exec()
  }

  async findByIdWithPassword(id: string) {
    
    return this.model.findById(id).exec();
  }

  async findByEmailWithPassword(email: string) {
    return this.model.findOne({ email }).exec(); 
  }

  async existsByEmail(email: string) {
    const count = await this.model.countDocuments({ email }).exec();
    return count > 0;
  }
    async updateByFilter(filter: FilterQuery<IUser>, update: any) {
    return this.model.findOneAndUpdate(filter, update, { new: true }).lean().exec();
  }
}
