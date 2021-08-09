import { AppError } from '@/Shared/Errors'
import { Profile } from '@/Shared/Models'
import { $errors } from '@/Shared/Utils'

import {
  Input,
  Output,
  IUnfollowProfileService
} from './unfollowService.protocol'
import { UnfollowUserRepository } from './unfollowUserRepository.protocol'
import { UnfollowFollowerRepository } from './unfollowFollowerRepository.protocol'

type Dependencies = {
  followerRepo: UnfollowFollowerRepository
  userRepo: UnfollowUserRepository
}

export class UnfollowProfile implements IUnfollowProfileService {
  private followerRepo: UnfollowFollowerRepository
  private userRepo: UnfollowUserRepository

  constructor({ followerRepo, userRepo }: Dependencies) {
    this.followerRepo = followerRepo
    this.userRepo = userRepo
  }

  async execute(input: Input): Promise<Output> {
    const { username, loggedInUserId } = input
    const user = await this.userRepo.findOneByUsername(username)
    if (!user) throw new AppError($errors.notFound, { username })
    await this.followerRepo.unfollow({
      followedId: user.id,
      followerId: loggedInUserId
    })
    const profile = new Profile({ ...user, following: false })
    return profile
  }
}
