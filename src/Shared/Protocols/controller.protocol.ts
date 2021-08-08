import { HttpReq, HttpRes } from '@/Shared/Protocols'

export interface Controller {
  handle(request: HttpReq): Promise<HttpRes>
}
