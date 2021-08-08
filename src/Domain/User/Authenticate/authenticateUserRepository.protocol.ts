import { User } from '@/Shared/Models'

export interface AuthenticateUserRepository {
  findOneById(id: string): Promise<User | null>
}
