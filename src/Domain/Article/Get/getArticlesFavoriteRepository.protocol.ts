import { Favorite } from '@/Shared/Models'

export type IsFavoritedInput = { articleId: string; loggedInUserId: string }

export interface GetArticlesFavoriteRepository {
  countByArticleId(articleId: string): Promise<number>
  isFavorited(input: IsFavoritedInput): Promise<boolean>
  findByUserId(userId: string): Promise<Favorite[]>
}
