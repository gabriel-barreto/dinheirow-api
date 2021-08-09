import { AppError } from '@/Shared/Errors'
import { Profile, User } from '@/Shared/Models'
import { $errors } from '@/Shared/Utils'
import { GetArticlesFavoriteRepository } from './getArticlesFavoriteRepository.protocol'
import { GetArticlesFollowerRepository } from './getArticlesFollowerRepository.protocol'
import { GetArticlesRepository } from './getArticlesRepository.protocol'
import {
  Input,
  Output,
  GetArticlesService
} from './getArticlesService.protocol'
import { GetArticlesUserRepository } from './getArticlesUserRepository.protocol'

type Dependencies = {
  articlesRepo: GetArticlesRepository
  favoriteRepo: GetArticlesFavoriteRepository
  followerRepo: GetArticlesFollowerRepository
  userRepo: GetArticlesUserRepository
}

export class GetArticles implements GetArticlesService {
  private articlesRepo: GetArticlesRepository
  private favoriteRepo: GetArticlesFavoriteRepository
  private followerRepo: GetArticlesFollowerRepository
  private userRepo: GetArticlesUserRepository

  constructor({
    articlesRepo,
    favoriteRepo,
    followerRepo,
    userRepo
  }: Dependencies) {
    this.articlesRepo = articlesRepo
    this.favoriteRepo = favoriteRepo
    this.followerRepo = followerRepo
    this.userRepo = userRepo
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

  private async getFavoritedArticleIdsOfUser(userId: string) {
    const found = await this.favoriteRepo.findByUserId(userId)
    console.log(found)
    return found.map(({ articleId }) => articleId)
  }

  private async findUserByUsername(username: string) {
    const user = await this.userRepo.findOneByUsername(username)
    if (!user) throw new AppError($errors.notFound, { username })
    return user
  }

  async execute(input: Input): Promise<Output> {
    const { author, favorited, limit, loggedInUserId, offset, tag } = input
    const query = {}
    if (author) {
      const user = await this.findUserByUsername(author)
      Object.assign(query, { author: user.id })
    }
    if (tag) Object.assign(query, { tag })
    if (favorited) {
      const favoritedUser = await this.findUserByUsername(favorited)
      const articleIds = await this.getFavoritedArticleIdsOfUser(
        favoritedUser.id
      )
      Object.assign(query, { favorited: articleIds })
    }
    const findArticlesDTO = { query, limit, offset }
    const articles = await this.articlesRepo.find(findArticlesDTO)
    if (!articles.length) throw new AppError($errors.notFound, findArticlesDTO)
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
