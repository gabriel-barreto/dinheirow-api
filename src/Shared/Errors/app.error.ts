import { BAD_REQUEST } from 'http-status'
import { pick } from 'lodash'

import { app } from '@/Config'

type Context = {
  message?: string
  code?: string
  status?: number
  details?: any
}

export class AppError extends Error {
  public readonly code: string
  public readonly details: Record<string, any>
  public readonly message: string
  public readonly name: string
  public readonly status: number

  constructor(
    { code = 'APP_ERROR', message = 'Error', status = BAD_REQUEST }: Context,
    details: Record<string, any> = {}
  ) {
    super(message)
    this.code = code
    this.details = details
    this.message = message
    this.name = code
    this.status = status
    Object.setPrototypeOf(this, AppError.prototype)
  }

  public toJSON(): Record<string, any> {
    const payload = pick(this, 'code', 'message')
    if (app.env === 'development') {
      const stack = this.stack?.split('\n')
      Object.assign(payload, { stack })
    }
    if (Object.keys(this.details).length) {
      const { details } = this
      Object.assign(payload, { details })
    }
    return payload
  }
}
