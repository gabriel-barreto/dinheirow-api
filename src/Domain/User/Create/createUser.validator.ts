import * as Yup from 'yup'

import { Validator } from '@/Shared/Protocols'
import { YupValidator } from '@/Shared/Providers/yupValidator.provider'

export class CreateUserYupValidator implements Validator {
  private validator: YupValidator

  constructor() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .max(32)
        .required(),
      username: Yup.string().required()
    })
    this.validator = new YupValidator(schema)
  }

  async validate(payload: Record<string, any>) {
    await this.validator.validate(payload)
  }
}
