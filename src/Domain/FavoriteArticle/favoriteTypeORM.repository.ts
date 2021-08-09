import { EntityRepository, Repository as _Repository } from 'typeorm'

import { getTypeORMCustomRepo } from '@/Shared/Utils'

import { FavoriteArticle } from './favoriteArticleTypeORM.entity'
import {
  GetArticlesFavoriteRepository,
  IsFavoritedInput
} from '@/Domain/Article/Get/getArticlesFavoriteRepository.protocol'
import { Favorite } from '@/Shared/Models'

interface FavoriteArticleRepo extends _Repository<FavoriteArticle> {}

@EntityRepository(FavoriteArticle)
class TypeORMRepo
  extends _Repository<FavoriteArticle>
  implements FavoriteArticleRepo {}

export class FavoriteArticlesTypeORMRepository
  implements GetArticlesFavoriteRepository
{
  private $getRepo: () => FavoriteArticleRepo

  constructor() {
    this.$getRepo = getTypeORMCustomRepo<FavoriteArticleRepo>(TypeORMRepo)
  }

  async findByUserId(userId: string): Promise<Favorite[]> {
    const found = await this.$getRepo().find({
      select: ['articleId', 'id', 'userId'],
      where: { userId }
    })
    return found
  }

  async countByArticleId(articleId: string): Promise<number> {
    const count = await this.$getRepo().count({ where: { articleId } })
    return count
  }

  async isFavorited(input: IsFavoritedInput): Promise<boolean> {
    const { articleId, loggedInUserId: userId } = input
    const found = await this.$getRepo().findOne({ articleId, userId })
    return !!found
  }
}
