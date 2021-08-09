import * as Yup from 'yup'

import { Validator } from '@/Shared/Protocols'
import { YupValidator } from '@/Shared/Providers/yupValidator.provider'

export class GetProfileYupValidator implements Validator {
  private validator: YupValidator

  constructor() {
    const schema = Yup.object().shape({
      username: Yup.string().required()
    })
    this.validator = new YupValidator(schema)
  }

  async validate(payload: Record<string, any>): Promise<void> {
    return this.validator.validate(payload)
  }
}
