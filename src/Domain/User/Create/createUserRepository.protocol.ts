import { Input, Output } from './createUser.protocol'

export interface CreateUserRepository {
  insertOne(payload: Input): Promise<Output>
  findOneByEmail(email: string): Promise<Output | null>
  findOneByUsername(username: string): Promise<Output | null>
}
