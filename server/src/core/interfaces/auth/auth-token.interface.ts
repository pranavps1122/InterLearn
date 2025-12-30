export interface IAuthTokenService {
  generateAccessToken(payload: any): string;
  generateRefreshToken(payload: any): string;
  refreshAccessToken(token: string): Promise<string>;
}