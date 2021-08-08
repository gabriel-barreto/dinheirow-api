import dotenv from 'dotenv'

import './yup.config'
import Config from './app.config'

dotenv.config({ path: Config.envPath })

export { Config as app }
export { default as api } from './api.config'
export { default as auth } from './auth.config'
export { default as database } from './database.config'
export { default as encrypter } from './encrypter.config'
export { default as jwt } from './jwt.config'
export { default as sentry } from './sentry.config'
