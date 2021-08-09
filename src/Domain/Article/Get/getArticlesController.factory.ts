import { ArticlesTypeORMRepository } from '@/Domain/Article/articleTypeORM.repository'
import { FollowerTypeORMRepository } from '@/Domain/Follower/followerTypeORM.repository'
import { FavoriteArticlesTypeORMRepository } from '@/Domain/FavoriteArticle/favoriteTypeORM.repository'
import { withOptionalAuth } from '@/Domain/User/Authenticate'
import { UserTypeORMRepository } from '@/Domain/User/userTypeORM.repository'

import { GetArticlesController } from './getArticles.controller'
import { GetArticles } from './getArticles.service'
import { GetArticlesYupValidator } from './getArticles.validator'
import { GetArticlesView } from './getArticles.view'

export function makeGetArticlesController() {
  const articlesRepo = new ArticlesTypeORMRepository()
  const favoriteRepo = new FavoriteArticlesTypeORMRepository()
  const followerRepo = new FollowerTypeORMRepository()
  const userRepo = new UserTypeORMRepository()
  const getArticles = new GetArticles({
    articlesRepo,
    favoriteRepo,
    followerRepo,
    userRepo
  })
  const validator = new GetArticlesYupValidator()
  const view = new GetArticlesView()
  const getArticlesController = new GetArticlesController({
    getArticles,
    validator,
    view
  })
  return withOptionalAuth(getArticlesController)
}
