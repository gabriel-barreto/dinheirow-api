import { Request } from 'express'

import { AppError } from '.'

export type HttpReq<Body = Record<string, any>> = { body: Body }
export type ExpressReqWithError = Request & { error: AppError }
