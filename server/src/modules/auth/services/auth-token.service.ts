import { IAuthTokenService } from "@/core/interfaces/auth/auth-token.interface";
import { ITokenProvider } from "@/core/interfaces/common/token-provider.interface";
import { RefreshTokenRepository } from "../repository/refresh-token.repo";
import { HttpError } from "@/core";


export class AuthTokenService implements IAuthTokenService {
    constructor(
        private readonly tokenProvider : ITokenProvider,
        private readonly refreshTokenRepo:RefreshTokenRepository
    ){}

    generateAccessToken(payload: any): string {
        return this.tokenProvider.sign(payload,'access')
    }
    generateRefreshToken(payload: any): string {
        return this.tokenProvider.sign(payload,'refresh')
    }

   async refreshAccessToken(refreshToken: string): Promise<string> {
  try {
   
    const payload = this.tokenProvider.verify(refreshToken, "refresh");

  
    const exists = await this.refreshTokenRepo.findByToken(refreshToken);
    if (!exists) {
      throw HttpError.Unauthorized("Session expired");
    }

   
    return this.generateAccessToken({
      id: payload.id,
      role: payload.role,
    });
  } catch {
    throw HttpError.Unauthorized("Invalid refresh token");
  }
}
}