function requireEnv(key:string):string{
    const value = process.env[key]
    if(!value){
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value
}

function requireNumber(key: string): number {
  const raw = process.env[key];

  if (!raw) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  const value = Number(raw);

  if (!Number.isFinite(value)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }

  return value;
}


export const env = Object.freeze({
  accessTokenSecret: requireEnv("ACCESS_TOKEN_SECRET"),
  refreshTokenSecret: requireEnv("REFRESH_TOKEN_SECRET"),
  refreshTokenMaxAge: requireNumber("REFRESH_TOKEN_MAX_AGE"),
});

