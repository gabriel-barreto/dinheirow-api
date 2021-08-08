import { Response, NextFunction, Request } from 'express'
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from 'http-status'
import Youch from 'youch'
import forTerminal from 'youch-terminal'

import { app } from '@/Config'

import { ExpressReqWithError } from '@/Shared/Protocols'
import { AppError, YupValidationError } from '@/Shared/Errors'

export async function exceptionHandler(
  err: Error,
  request: Request | ExpressReqWithError,
  response: Response,
  __: NextFunction
): Promise<any> {
  const { error } = request as ExpressReqWithError
  if (app.env === 'development') {
    const youchErr = new Youch(err, request)
    const jsonErr = await youchErr.toJSON()
    console.log(err)
    console.log(JSON.stringify(error, null, 2))
    console.log(forTerminal(jsonErr))
  }
  if (error && error instanceof YupValidationError) {
    return response.status(UNPROCESSABLE_ENTITY).json(error.toJSON())
  }
  if (err instanceof AppError) {
    return response.status(err.status).json(err.toJSON())
  }
  return response.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error'
  })
}
