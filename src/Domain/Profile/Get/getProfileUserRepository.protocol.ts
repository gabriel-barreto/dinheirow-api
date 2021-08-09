import { User } from '@/Shared/Models'

export interface GetProfileUserRepository {
  findOneByUsername(username: string): Promise<User | null>
}
