import { FollowerTypeORMRepository } from '@/Domain/Follower/followerTypeORM.repository'
import { withAuth } from '@/Domain/User/Authenticate'
import { UserTypeORMRepository } from '@/Domain/User/userTypeORM.repository'
import { UnfollowProfileController } from './unfollow.controller'
import { UnfollowProfile } from './unfollow.service'
import { UnfollowProfileYupValidator } from './unfollow.validator'

export function makeUnfollowProfileController() {
  const followerRepo = new FollowerTypeORMRepository()
  const userRepo = new UserTypeORMRepository()
  const followProfile = new UnfollowProfile({ followerRepo, userRepo })
  const validator = new UnfollowProfileYupValidator()
  const unfollowProfileController = new UnfollowProfileController({
    followProfile,
    validator
  })
  return withAuth(unfollowProfileController)
}
