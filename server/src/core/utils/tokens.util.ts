import jwt, { JwtPayload,Secret,SignOptions } from "jsonwebtoken";
import { config } from "@/config";

export const generateAccessToken = (payload: object): string => {
  const secret: Secret = config.accessTokenSecret;            
    const options: SignOptions = {
    expiresIn: config.accessTokenExp as unknown as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};

export const generateRefreshToken = (payload: object): string => {
  const secret: Secret = config.refreshTokenSecret;
    const options: SignOptions = {
    expiresIn: config.refreshTokenExp as unknown as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.accessTokenSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.refreshTokenSecret) as JwtPayload;
};
