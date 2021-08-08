import { Input, Output } from './createUser.protocol'

export interface CreateUserService {
  execute(input: Input): Promise<Output>
}
