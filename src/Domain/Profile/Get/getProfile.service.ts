import { Profile } from '@/Shared/Models'
import { AppError } from '@/Shared/Errors'
import { $errors } from '@/Shared/Utils'

import { GetProfileFollowerRepository } from './getProfileFollowerRepository.protocol'
import { Input, Output, IGetProfileService } from './getProfileService.protocol'
import { GetProfileUserRepository } from './getProfileUserRepository.protocol'

type Dependencies = {
  followerRepo: GetProfileFollowerRepository
  userRepo: GetProfileUserRepository
}

export class GetProfile implements IGetProfileService {
  followerRepo: GetProfileFollowerRepository
  userRepo: GetProfileUserRepository

  constructor({ followerRepo, userRepo }: Dependencies) {
    this.followerRepo = followerRepo
    this.userRepo = userRepo
  }

  async execute(input: Input): Promise<Output> {
    const { loggedInUserId, username } = input
    const user = await this.userRepo.findOneByUsername(username)
    if (!user) throw new AppError($errors.notFound, { username })
    const { bio, email, id, image } = user
    const profile = new Profile({ bio, email, image, username })
    if (loggedInUserId) {
      const following = await this.followerRepo.isFollowing({
        followerId: loggedInUserId,
        followedId: id
      })
      profile.following = following
    }
    return profile
  }
}
