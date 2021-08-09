type Input = { followedId: string; followerId: string }
type Output = Input & { id: string }

export interface FollowFollowerRepository {
  follow(input: Input): Promise<Output>
}
