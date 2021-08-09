import { User } from '@/Shared/Models'

export interface UnfollowUserRepository {
  findOneByUsername(username: string): Promise<User | null>
}
