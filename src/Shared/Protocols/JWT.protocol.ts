export interface JWTProvider {
  verify: (jwt: string) => Promise<Record<string, any>>
  sign: (payload: Record<string, any>) => Promise<string>
}

export type JWTConfig = {
  expiresIn: string
  secret: string
}
