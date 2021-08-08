import env from 'env-var'

const enabled = env
  .get('SENTRY_ENABLED')
  .default('true')
  .asBool()
const dsn = (() => {
  const envVar = env.get('SENTRY_DSN')
  if (!enabled) return envVar.asString()
  return envVar.required().asUrlString()
})()
const debug = env
  .get('SENTRY_DEBUG')
  .default('false')
  .asBool()

export default Object.freeze({ dsn, debug, enabled })
