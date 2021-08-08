import { EntityRepository, Repository as _Repository } from 'typeorm'

import { getTypeORMCustomRepo } from '@/Shared/Utils'

import { AuthenticateUserRepository } from './Authenticate/authenticateUserRepository.protocol'
import { CreateUserRepository } from './Create/createUserRepository.protocol'
import { LoginUserRepository } from './Login/loginRepository.protocol'

import { User } from './userTypeORM.entity'
import { UpdateCurrentUserRepository } from './UpdateCurrent/updateCurrentUserRepository.protocol'

type UserPayload = Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>

interface UserRepo extends _Repository<User> {}

@EntityRepository(User)
class TypeORMRepo extends _Repository<User> implements UserRepo {}

export class UserTypeORMRepository
  implements
    AuthenticateUserRepository,
    CreateUserRepository,
    LoginUserRepository,
    UpdateCurrentUserRepository
{
  private $getRepo: () => UserRepo

  constructor() {
    this.$getRepo = getTypeORMCustomRepo<UserRepo>(TypeORMRepo)
  }

  async update(id: string, payload: User): Promise<User> {
    const repo = this.$getRepo()
    await repo.update({ id }, payload)
    const updated = await this.findOne({ id })
    return updated as User
  }

  private async findOne(query: Record<string, any>): Promise<User | null> {
    const repo = this.$getRepo()
    const found = await repo.findOne(query)
    if (!found) return null
    return found
  }

  public async findOneById(id: string): Promise<User | null> {
    return this.findOne({ id })
  }

  public async findOneByUsername(username: string): Promise<User | null> {
    return this.findOne({ username })
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return this.findOne({ email })
  }

  public async insertOne(payload: UserPayload) {
    const repo = this.$getRepo()
    const created = repo.create(payload)
    await repo.save(created)
    return created
  }
}
