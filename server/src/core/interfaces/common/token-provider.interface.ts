export interface ITokenProvider {
  sign(payload: Record<string, any>, type: "access" | "refresh"): string;
  verify(token: string, type: "access" | "refresh"): Record<string, any>;
}
