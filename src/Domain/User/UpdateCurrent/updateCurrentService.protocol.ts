import { User } from '@/Shared/Models'

type Input = Pick<User, 'bio' | 'email' | 'id' | 'image'>
type Output = User

export interface IUpdateCurrentService {
  execute(input: Input): Promise<Output>
}
