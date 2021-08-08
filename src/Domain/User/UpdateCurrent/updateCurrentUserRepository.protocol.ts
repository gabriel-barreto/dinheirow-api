import { User } from '@/Shared/Models'

export interface UpdateCurrentUserRepository {
  update(id: string, updated: User): Promise<User>
}
