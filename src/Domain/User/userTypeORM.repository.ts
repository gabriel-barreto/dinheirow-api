import { EntityRepository, Repository as _Repository } from 'typeorm'

import { getTypeORMCustomRepo } from '@/Shared/Utils'

import { User } from './userTypeORM.entity'
import { CreateUserRepository } from './Create/createUserRepository.protocol'

type UserPayload = Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>

interface UserRepo extends _Repository<User> {}

@EntityRepository(User)
class TypeORMRepo extends _Repository<User> implements UserRepo {}

export class UserTypeORMRepository implements CreateUserRepository {
  private $getRepo: () => UserRepo

  constructor() {
    this.$getRepo = getTypeORMCustomRepo<UserRepo>(TypeORMRepo)
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const repo = this.$getRepo()
    const found = await repo.findOne({ email })
    if (!found) return null
    return found
  }

  public async insertOne(payload: UserPayload) {
    const repo = this.$getRepo()
    const created = repo.create(payload)
    await repo.save(created)
    return created
  }
}
