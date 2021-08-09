type SearchParams = { followerId: string; followedId: string }

export interface GetArticlesFollowerRepository {
  isFollowing(params: SearchParams): Promise<boolean>
}
