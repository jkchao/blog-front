const IS_DEV = process.env.NODE_ENV !== 'production'

export const API_ROOT = IS_DEV ? 'http://api.jkchao.cn/api/' : 'http://api.jkchao.cn/api/'
