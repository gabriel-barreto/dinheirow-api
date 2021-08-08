import { User } from '@/Shared/Models'

import { IUpdateCurrentService } from './updateCurrentService.protocol'
import { UpdateCurrentUserRepository } from './updateCurrentUserRepository.protocol'

type Dependencies = { userRepo: UpdateCurrentUserRepository }

export class UpdateCurrentService implements IUpdateCurrentService {
  userRepo: UpdateCurrentUserRepository

  constructor({ userRepo }: Dependencies) {
    this.userRepo = userRepo
  }

  async execute(input: User): Promise<User> {
    const { id } = input
    const updated = await this.userRepo.update(id, input)
    return updated
  }
}
