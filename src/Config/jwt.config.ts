import env from 'env-var'

export default Object.freeze({
  expiresIn: env
    .get('JWT_EXPIRES_IN')
    .required()
    .asString(),
  secret: env
    .get('JWT_SECRET')
    .required()
    .asString()
})
