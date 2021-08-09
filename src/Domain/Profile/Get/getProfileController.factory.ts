import { Controller } from '@/Shared/Protocols'

import { FollowerTypeORMRepository } from '@/Domain/Follower/followerTypeORM.repository'
import { UserTypeORMRepository } from '@/Domain/User/userTypeORM.repository'
import { withOptionalAuth } from '@/Domain/User/Authenticate'

import { GetProfileController } from './getProfile.controller'
import { GetProfile } from './getProfile.service'
import { GetProfileYupValidator } from './getProfile.validator'

export function makeGetProfileController(): Controller {
  const followerRepo = new FollowerTypeORMRepository()
  const userRepo = new UserTypeORMRepository()
  const profile = new GetProfile({ followerRepo, userRepo })
  const validator = new GetProfileYupValidator()
  const profileController = new GetProfileController({ profile, validator })
  return withOptionalAuth(profileController)
}
