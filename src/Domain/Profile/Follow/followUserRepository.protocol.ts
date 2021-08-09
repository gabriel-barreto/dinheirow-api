import { User } from '@/Shared/Models'

export interface FollowUserRepository {
  findOneByUsername(username: string): Promise<User | null>
}
