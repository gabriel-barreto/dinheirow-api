import { Request, Response } from 'express'
import { Controller } from '@/Shared/Protocols'

export class ExpressHandlerAdapter {
  public static adapt(controller: Controller) {
    return async function _handle(req: Request, res: Response) {
      const httpReq = {
        body: req.body,
        headers: req.headers,
        params: req.params
      }
      const httpRes = await controller.handle(httpReq)
      return res.status(httpRes.status).send(httpRes.body)
    }
  }
}
