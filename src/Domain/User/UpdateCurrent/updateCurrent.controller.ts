import { Responses } from '@/Shared/Helpers'
import { AuthHttpReq, Controller, HttpRes, Validator } from '@/Shared/Protocols'

import { IUpdateCurrentService } from './updateCurrentService.protocol'

type Dependencies = {
  updateCurrent: IUpdateCurrentService
  validator: Validator
}

export class UpdateCurrentController implements Controller {
  private updateCurrent: IUpdateCurrentService
  private validator: Validator

  constructor({ updateCurrent, validator }: Dependencies) {
    this.updateCurrent = updateCurrent
    this.validator = validator
  }

  async handle(request: AuthHttpReq): Promise<HttpRes> {
    await this.validator.validate(request.body)
    const { id } = request.user
    const { bio, email, image } = request.body
    const updated = await this.updateCurrent.execute({ bio, email, id, image })
    return Responses.ok(updated)
  }
}
