import { Responses } from '@/Shared/Helpers'
import { Controller, AuthHttpReq, HttpRes, Validator } from '@/Shared/Protocols'
import { IFollowProfileService } from './followService.protocol'

type Dependencies = {
  followProfile: IFollowProfileService
  validator: Validator
}

export class FollowProfileController implements Controller {
  private followProfile: IFollowProfileService
  private validator: Validator

  constructor({ followProfile, validator }: Dependencies) {
    this.followProfile = followProfile
    this.validator = validator
  }

  async handle(request: AuthHttpReq): Promise<HttpRes> {
    await this.validator.validate(request.params)
    const { username } = request.params
    const { id: loggedInUserId } = request.user
    const profile = await this.followProfile.execute({
      loggedInUserId,
      username
    })
    return Responses.ok({ profile: profile.value })
  }
}
