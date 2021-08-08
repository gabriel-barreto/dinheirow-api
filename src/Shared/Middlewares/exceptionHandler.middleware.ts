import { Response, NextFunction, Request } from 'express'
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from 'http-status'
import Youch from 'youch'
import forTerminal from 'youch-terminal'

import { app } from '@/Config'

import { AppError, YupValidationError } from '@/Shared/Errors'

export async function exceptionHandler(
  err: Error,
  request: Request,
  response: Response,
  __: NextFunction
): Promise<any> {
  if (app.env === 'development') {
    const youchErr = new Youch(err, request)
    const jsonErr = await youchErr.toJSON()
    console.log(err)
    console.log(forTerminal(jsonErr))
  }
  if (err instanceof YupValidationError) {
    return response.status(UNPROCESSABLE_ENTITY).json(err.toJSON())
  }
  if (err instanceof AppError) {
    return response.status(err.status).json(err.toJSON())
  }
  return response.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error'
  })
}
