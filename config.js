const IS_DEV = process.env.NODE_ENV !== 'production'

const API_ROOT = IS_DEV ? 'http://localhost:8000/api/' : 'https://api.jkchao.cn/api/'

const STATIC_PATH = 'https://static.jkchao.cn'

const CDN_PATH = 'https://cdn.jkchao.cn/nuxt'

const QINIU_OPTIONS = {
  accessKey: 'uRYE0M3ru9g5Al1h-H1sUV6qqFKAJ4F4yPQXoLcf',
  secretKey: '_So4S5DZNYmvDezZqav7iB4Z4UZZMawKM_0Uokph',
  bucket: 'blog-cdn',
  domain: 'http://ply4cszel.bkt.clouddn.com'
}

module.exports = {
  IS_DEV,
  API_ROOT,
  STATIC_PATH,
  CDN_PATH,
  QINIU_OPTIONS
}