type Input = { followedId: string; followerId: string }

export interface UnfollowFollowerRepository {
  unfollow(input: Input): Promise<void>
}
