import { AppError } from '@/Shared/Errors'
import { Profile, User } from '@/Shared/Models'
import { $errors } from '@/Shared/Utils'
import { FeedArticlesRepository } from './feedArticlesRepository.protocol'
import { FeedFavoriteRepository } from './feedFavoriteRepository.protocol'
import { FeedFollowerRepository } from './feedFollowerRepository.protocol'
import { FeedService, Input, Output } from './feedService.protocol'
import { FeedUserRepository } from './feedUserRepository.protocol'

type Dependencies = {
  articleRepo: FeedArticlesRepository
  favoriteRepo: FeedFavoriteRepository
  followerRepo: FeedFollowerRepository
  userRepo: FeedUserRepository
}

export class Feed implements FeedService {
  private articleRepo: FeedArticlesRepository
  private favoriteRepo: FeedFavoriteRepository
  private followerRepo: FeedFollowerRepository
  private userRepo: FeedUserRepository

  constructor({
    articleRepo,
    favoriteRepo,
    followerRepo,
    userRepo
  }: Dependencies) {
    this.articleRepo = articleRepo
    this.favoriteRepo = favoriteRepo
    this.followerRepo = followerRepo
    this.userRepo = userRepo
  }

  private async isFavoritedByLoggedUser(
    articleId: string,
    loggedInUserId?: string
  ) {
    if (!loggedInUserId) return false
    const favorited = await this.favoriteRepo.isFavorited({
      articleId,
      loggedInUserId
    })
    return favorited
  }

  private async findUserByUsername(username: string) {
    const user = await this.userRepo.findOneByUsername(username)
    if (!user) throw new AppError($errors.notFound, { username })
    return user
  }

  private async getAuthorProfile(author: User, loggedInUserId?: string) {
    const profile = new Profile(author)
    if (loggedInUserId) {
      const following = await this.followerRepo.isFollowing({
        followerId: loggedInUserId,
        followedId: author.id
      })
      profile.following = following
    }
    return profile
  }

  async execute(input: Input): Promise<Output> {
    const { limit = 20, offset = 0, loggedInUserId } = input
    const followed = await this.followerRepo.findByFollowerId(loggedInUserId)
    const authorsId = followed.map(({ followedId }) => followedId)
    const articlesFeedDTO = { authorsId, limit, offset }
    const articles = await this.articleRepo.getByAuthors(articlesFeedDTO)
    if (!articles.length) throw new AppError($errors.notFound, articlesFeedDTO)
    const feed = await Promise.all(
      articles.map(async (article) => {
        const [author, favorited, favoritesCount] = await Promise.all([
          this.getAuthorProfile(article.author, loggedInUserId),
          this.isFavoritedByLoggedUser(article.id, loggedInUserId),
          this.favoriteRepo.countByArticleId(article.id)
        ])
        return { ...article, author, favoritesCount, favorited }
      })
    )
    return feed
  }
}
