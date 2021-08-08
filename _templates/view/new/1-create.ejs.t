---
to: src/Domain/<%= Name %>/<%= name %>.view.ts
unless_exists: true
---
import { <%= Name %> as Entity } from './<%= name %>.entity'

type <%= Name %>View = {
  token: string
  user: { name: string }
}

export class View {
  transformOne(item: Entity): <%= Name %>View {
    return item
  }

  transformMany(items: Entity[]): <%= Name %>View[] {
    return items.map(this.transformOne)
  }
}
