import { Responses } from '@/Shared/Helpers'
import {
  AuthHttpReq,
  Controller,
  HttpReq,
  HttpRes,
  Validator
} from '@/Shared/Protocols'
import { IGetProfileService } from './getProfileService.protocol'

type Dependencies = {
  profile: IGetProfileService
  validator: Validator
}

export class GetProfileController implements Controller {
  private profile: IGetProfileService
  private validator: Validator

  constructor({ profile, validator }: Dependencies) {
    this.profile = profile
    this.validator = validator
  }

  async handle(request: AuthHttpReq | HttpReq): Promise<HttpRes> {
    await this.validator.validate(request.params)
    const { username } = request.params
    const loggedInUserId = 'user' in request ? request.user.id : undefined
    const profile = await this.profile.execute({ username, loggedInUserId })
    return Responses.ok({ profile: profile.value })
  }
}
