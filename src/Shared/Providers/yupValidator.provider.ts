import * as Yup from 'yup'

import { YupValidationError } from '@/Shared/Errors/yupValidation.error'
import { Validator } from '@/Shared/Protocols'

export class YupValidator implements Validator {
  private schema: Yup.Schema<any>

  constructor(schema: Yup.Schema<any>) {
    this.schema = schema
  }

  public async validate(payload: Record<string, any>) {
    try {
      await this.schema.validate(payload, { abortEarly: false })
    } catch (ex) {
      throw new YupValidationError(ex)
    }
  }
}
