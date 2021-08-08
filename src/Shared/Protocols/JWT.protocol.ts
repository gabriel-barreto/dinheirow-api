export type Input = { email: string; id: string }
export type Config = {
  expiresIn: string
  secret: string
}
export interface JWTProvider {
  verify: (jwt: string) => Promise<Record<string, any>>
  sign: (input: Input) => Promise<string>
}
