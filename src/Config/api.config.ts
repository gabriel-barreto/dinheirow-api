import env from 'env-var'

import app from './app.config'

const { API_SLUG: apiSlug = 'api', STATUS_SLUG: statusSlug = '/' } = process.env

const host = env
  .get('HOST')
  .default('http://127.0.0.1')
  .asUrlString()

const port = env
  .get('PORT')
  .default(5000)
  .asPortNumber()

function handleSlug(rawSlug) {
  if (rawSlug.charAt(0) !== '/') return `/${rawSlug}`
  return rawSlug
}

const baseUrl = (() => {
  let _url = host
  if (app.env === 'development') _url = `${_url}:${port}`
  return _url
})()

const urls = Object.freeze({ base: baseUrl })
const slugs = Object.freeze({
  api: handleSlug(apiSlug),
  status: handleSlug(statusSlug)
})

export default Object.freeze({ port, urls, slugs })
