import { EntityRepository, ILike, In, Repository as _Repository } from 'typeorm'

import { getTypeORMCustomRepo } from '@/Shared/Utils'

import { GetArticlesRepository } from '@/Domain/Article/Get/getArticlesRepository.protocol'

import { Article } from './articleTypeORM.entity'
import {
  FeedArticlesRepository,
  Input,
  Output
} from './Feed/feedArticlesRepository.protocol'

type FindInput = {
  query: {
    tag?: string | undefined
    author?: string | undefined
    favorited?: string[] | undefined
  }
  limit: number
  offset: number
}

interface ArticleRepo extends _Repository<Article> {}

@EntityRepository(Article)
class TypeORMRepo extends _Repository<Article> implements ArticleRepo {}

export class ArticlesTypeORMRepository
  implements GetArticlesRepository, FeedArticlesRepository
{
  private $getRepo: () => ArticleRepo

  constructor() {
    this.$getRepo = getTypeORMCustomRepo<ArticleRepo>(TypeORMRepo)
  }

  async getByAuthors(input: Input): Promise<Output> {
    const { authorsId, limit: take, offset: skip } = input
    const where = { authorId: In(authorsId) }
    const found = await this.$getRepo().find({ skip, take, where })
    return found
  }

  async find(input: FindInput): Promise<Article[]> {
    const where = {}
    const { limit, offset } = input
    const { author, favorited, tag } = input.query
    if (author) Object.assign(where, { authorId: author })
    if (favorited?.length) Object.assign(where, { id: In(favorited) })
    if (tag) Object.assign(where, { tagList: ILike(`%${tag}%`) })
    const articles = await this.$getRepo().find({
      where,
      order: { createdAt: 'DESC', updatedAt: 'DESC', title: 'ASC' },
      take: limit,
      skip: offset
    })
    return articles
  }
}
