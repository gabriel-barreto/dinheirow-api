import { Responses } from '@/Shared/Helpers'
import { Controller, AuthHttpReq, HttpRes, Validator } from '@/Shared/Protocols'
import { IUnfollowProfileService } from './unfollowService.protocol'

type Dependencies = {
  followProfile: IUnfollowProfileService
  validator: Validator
}

export class UnfollowProfileController implements Controller {
  private followProfile: IUnfollowProfileService
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
