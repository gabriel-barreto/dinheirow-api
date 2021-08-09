import { FollowerTypeORMRepository } from '@/Domain/Follower/followerTypeORM.repository'
import { withAuth } from '@/Domain/User/Authenticate'
import { UserTypeORMRepository } from '@/Domain/User/userTypeORM.repository'
import { FollowProfileController } from './follow.controller'
import { FollowProfile } from './follow.service'
import { FollowProfileYupValidator } from './follow.validator'

export function makeFollowProfileController() {
  const followerRepo = new FollowerTypeORMRepository()
  const userRepo = new UserTypeORMRepository()
  const followProfile = new FollowProfile({ followerRepo, userRepo })
  const validator = new FollowProfileYupValidator()
  const followProfileController = new FollowProfileController({
    followProfile,
    validator
  })
  return withAuth(followProfileController)
}
