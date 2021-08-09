import { FavoriteArticlesTypeORMRepository } from '@/Domain/FavoriteArticle/favoriteTypeORM.repository'
import { FollowerTypeORMRepository } from '@/Domain/Follower/followerTypeORM.repository'
import { withAuth } from '@/Domain/User/Authenticate'
import { UserTypeORMRepository } from '@/Domain/User/userTypeORM.repository'
import { ArticlesTypeORMRepository } from '../articleTypeORM.repository'
import { FeedController } from './feed.controller'
import { Feed } from './feed.service'
import { FeedYupValidator } from './feed.validator'
import { FeedView } from './feed.view'

export function makeFeedController() {
  const articleRepo = new ArticlesTypeORMRepository()
  const favoriteRepo = new FavoriteArticlesTypeORMRepository()
  const followerRepo = new FollowerTypeORMRepository()
  const userRepo = new UserTypeORMRepository()
  const feed = new Feed({
    articleRepo,
    favoriteRepo,
    followerRepo,
    userRepo
  })
  const validator = new FeedYupValidator()
  const view = new FeedView()
  const feedController = new FeedController({
    feed,
    validator,
    view
  })
  return withAuth(feedController)
}
