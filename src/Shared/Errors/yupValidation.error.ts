import { pick } from 'lodash'
import { ValidationError } from 'yup'

import { app } from '@/Config'
import { $errors } from '../Utils'

export class YupValidationError extends Error {
  public readonly code: string
  public readonly errors: Record<string, unknown>
  constructor(validationError: ValidationError) {
    super($errors.validationFails.code)
    this.code = $errors.validationFails.code
    this.errors = Object.fromEntries(
      validationError.inner.map(({ path, message, params }) => {
        const { label = '' } = params as { label: string }
        const key = label || path
        const _message = message
          .replace(label, '')
          .replace(path, '')
          .trim()
        return [key, _message]
      })
    )
    this.message = $errors.validationFails.message
    this.name = $errors.validationFails.code
    Object.setPrototypeOf(this, YupValidationError.prototype)
  }

  public toJSON(): Record<string, any> {
    const payload = pick(this, 'code', 'errors', 'message')
    if (app.env === 'development') {
      const stack = this.stack?.split('\n')
      Object.assign(payload, { stack })
    }
    return payload
  }
}
