import { Following } from '@/Shared/Models'

type SearchParams = { followerId: string; followedId: string }

export interface FeedFollowerRepository {
  findByFollowerId(followerId: string): Promise<Following[]>
  isFollowing(params: SearchParams): Promise<boolean>
}
