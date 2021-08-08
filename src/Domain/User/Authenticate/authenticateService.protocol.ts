import { Token, User } from '@/Shared/Models'

export type Input = Token
export type Output = User

export interface IAuthenticateService {
  execute(token: Token): Promise<Output>
}
