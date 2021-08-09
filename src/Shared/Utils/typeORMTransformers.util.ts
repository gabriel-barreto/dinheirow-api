export const typeORMTransformers = {
  list: {
    from(val: string) {
      if (!val) return val
      return val.split(';')
    },
    to(val: string[]) {
      if (!Array.isArray(val)) return val
      if (!val || !val.length) return val
      return val.join(';')
    }
  }
}
