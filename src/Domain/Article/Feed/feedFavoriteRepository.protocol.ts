export type IsFavoritedInput = { articleId: string; loggedInUserId: string }

export interface FeedFavoriteRepository {
  countByArticleId(articleId: string): Promise<number>
  isFavorited(input: IsFavoritedInput): Promise<boolean>
}
