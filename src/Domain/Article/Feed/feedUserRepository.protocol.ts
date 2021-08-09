import { User } from '@/Shared/Models'

export interface FeedUserRepository {
  findOneByUsername(username: string): Promise<User | null>
}
