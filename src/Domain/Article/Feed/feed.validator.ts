import * as Yup from 'yup'

import { YupValidator } from '@/Shared/Providers/yupValidator.provider'
import { Validator } from '@/Shared/Protocols'

export class FeedYupValidator implements Validator {
  private validator: YupValidator

  constructor() {
    const schema = Yup.object().shape({
      limit: Yup.number(),
      offset: Yup.number()
    })
    this.validator = new YupValidator(schema)
  }

  validate(payload: Record<string, any>): Promise<void> {
    return this.validator.validate(payload)
  }
}
