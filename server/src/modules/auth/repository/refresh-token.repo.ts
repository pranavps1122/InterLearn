import { RefreshTokenModel } from "../models/refresh-token.schema";

export class RefreshTokenRepository {
  async deleteByUserId(userId: string) {
    await RefreshTokenModel.findOneAndDelete({userId})
  }

  async save(data: { token: string; userId: string; role: string }) {
    await RefreshTokenModel.create(data);
  }

  async findByToken(token: string) {
    return RefreshTokenModel.findOne({ token });
  }

  async deleteByToken(token: string) {
    await RefreshTokenModel.deleteOne({ token });
  }
}