import { AppError } from '@/Shared/Errors'
import { Profile } from '@/Shared/Models'
import { $errors } from '@/Shared/Utils'
import { FollowFollowerRepository } from './followFollowerRepository.protocol'

import { Input, Output, IFollowProfileService } from './followService.protocol'
import { FollowUserRepository } from './followUserRepository.protocol'

type Dependencies = {
  followerRepo: FollowFollowerRepository
  userRepo: FollowUserRepository
}

export class FollowProfile implements IFollowProfileService {
  private followerRepo: FollowFollowerRepository
  private userRepo: FollowUserRepository

  constructor({ followerRepo, userRepo }: Dependencies) {
    this.followerRepo = followerRepo
    this.userRepo = userRepo
  }

  async execute(input: Input): Promise<Output> {
    const { username, loggedInUserId } = input
    const user = await this.userRepo.findOneByUsername(username)
    if (!user) throw new AppError($errors.notFound, { username })
    await this.followerRepo.follow({
      followedId: user.id,
      followerId: loggedInUserId
    })
    const profile = new Profile({ ...user, following: true })
    return profile
  }
}
