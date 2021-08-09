import { Responses } from '@/Shared/Helpers'
import {
  AuthHttpReq,
  Controller,
  HttpReq,
  HttpRes,
  Validator,
  View
} from '@/Shared/Protocols'
import { GetArticlesService } from './getArticlesService.protocol'

type Dependencies = {
  getArticles: GetArticlesService
  validator: Validator
  view: View
}

export class GetArticlesController implements Controller {
  private getArticles: GetArticlesService
  private validator: Validator
  private view: View

  constructor({ getArticles, validator, view }: Dependencies) {
    this.getArticles = getArticles
    this.validator = validator
    this.view = view
  }

  async handle(request: HttpReq | AuthHttpReq): Promise<HttpRes> {
    await this.validator.validate(request.query)
    const { author, favorited, tag, limit = 20, offset = 0 } = request.query
    const loggedInUserId = 'user' in request ? request.user.id : undefined
    const articles = await this.getArticles.execute({
      author,
      favorited,
      limit,
      loggedInUserId,
      offset,
      tag
    })
    return Responses.ok({ articles: this.view.transformMany(articles) })
  }
}
