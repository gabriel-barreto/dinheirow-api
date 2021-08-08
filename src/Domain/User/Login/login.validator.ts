import * as Yup from 'yup'

import { Validator } from '@/Shared/Protocols'
import { YupValidator } from '@/Shared/Providers/yupValidator.provider'

export class LoginYupValidator implements Validator {
  private validator: YupValidator

  constructor() {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(32).required()
    })
    this.validator = new YupValidator(schema)
  }

  validate(payload) {
    return this.validator.validate(payload)
  }
}
