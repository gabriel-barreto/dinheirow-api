import * as Yup from 'yup'

import { YupValidator } from '@/Shared/Providers/yupValidator.provider'
import { Validator } from '@/Shared/Protocols'

export class GetArticlesYupValidator implements Validator {
  private validator: YupValidator

  constructor() {
    const schema = Yup.object().shape({
      author: Yup.string(),
      favorited: Yup.string(),
      limit: Yup.number(),
      offset: Yup.number(),
      tag: Yup.string()
    })
    this.validator = new YupValidator(schema)
  }

  validate(payload: Record<string, any>): Promise<void> {
    return this.validator.validate(payload)
  }
}
