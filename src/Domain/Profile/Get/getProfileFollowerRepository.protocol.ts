type SearchParams = { followerId: string; followedId: string }

export interface GetProfileFollowerRepository {
  isFollowing(params: SearchParams): Promise<boolean>
}
