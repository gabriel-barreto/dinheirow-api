import * as Yup from 'yup'

import { Validator } from '@/Shared/Protocols'
import { YupValidator } from '@/Shared/Providers/yupValidator.provider'

export class UpdateCurrentUserYupValidator implements Validator {
  private validator: YupValidator

  constructor() {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      bio: Yup.string().required(),
      image: Yup.string().required()
    })
    this.validator = new YupValidator(schema)
  }

  validate(payload: Record<string, any>): Promise<void> {
    return this.validator.validate(payload)
  }
}
