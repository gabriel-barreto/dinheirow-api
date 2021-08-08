import { Token } from '@/Shared/Models'

export type Input = { email: string; password: string }
export type Output = Token

export interface ILoginService {
  execute(input: Input): Promise<Output>
}
