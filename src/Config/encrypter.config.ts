import env from 'env-var'

const config = {
  rounds: env
    .get('ENCRYPTER_HASH_ROUNDS')
    .required()
    .asIntPositive()
}

export default Object.freeze(config)
