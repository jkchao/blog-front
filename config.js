const IS_DEV = process.env.NODE_ENV !== 'production';

const API_ROOT = IS_DEV ? 'http://localhost:8000/api/' : '/api/';

const STATIC_PATH = 'https://static.jkchao.cn';

const CDN_PATH = 'https://cdn.jkchao.cn/nuxt';

const QINIU_OPTIONS = {
  // qiniu accessKey secretKey
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY,
  bucket: 'blog-cdn',
  domain: 'http://ply4cszel.bkt.clouddn.com'
};

module.exports = {
  IS_DEV,
  API_ROOT,
  STATIC_PATH,
  CDN_PATH,
  QINIU_OPTIONS
};
