import dotenv from 'dotenv'

dotenv.config()

export const config = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as any,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as any,

  accessTokenExp: process.env.ACCESS_TOKEN_EXP || "15m",
  refreshTokenExp: process.env.REFRESH_TOKEN_EXP || "7d",

  cookieSecure: process.env.COOKIE_SECURE === "true",
  cookieDomain: process.env.COOKIE_DOMAIN || "localhost",
};