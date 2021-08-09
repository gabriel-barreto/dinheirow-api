import { omit } from 'lodash'

import { Article } from '@/Shared/Models'
import { View } from '@/Shared/Protocols'

export class FeedView implements View {
  transformOne(payload: Article) {
    return {
      ...omit(payload, 'id', 'authorId'),
      author: payload.author.value
    }
  }

  transformMany(payload: Article[]) {
    return payload.map(this.transformOne)
  }

  transform(payload: Article | Article[]) {
    if (Array.isArray(payload)) this.transformMany(payload)
    return this.transformOne(payload as Article)
  }
}
