import { Responses } from '@/Shared/Helpers'
import {
  Controller,
  AuthHttpReq,
  HttpRes,
  Validator,
  View
} from '@/Shared/Protocols'
import { FeedService } from './feedService.protocol'

type Dependencies = {
  feed: FeedService
  validator: Validator
  view: View
}

export class FeedController implements Controller {
  private feed: FeedService
  private validator: Validator
  private view: View

  constructor({ feed, validator, view }: Dependencies) {
    this.feed = feed
    this.validator = validator
    this.view = view
  }

  async handle(request: AuthHttpReq): Promise<HttpRes> {
    await this.validator.validate(request.query)
    const { id: loggedInUserId } = request.user
    const { limit, offset } = request.query
    const feed = await this.feed.execute({ limit, loggedInUserId, offset })
    return Responses.ok({ articles: this.view.transformMany(feed) })
  }
}
