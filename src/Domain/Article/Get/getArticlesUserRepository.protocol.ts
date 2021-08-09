import { User } from '@/Shared/Models'

export interface GetArticlesUserRepository {
  findOneByUsername(username: string): Promise<User | null>
}
