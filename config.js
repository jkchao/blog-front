const IS_DEV = process.env.NODE_ENV !== 'production'

export const API_ROOT = IS_DEV ? 'http://47.52.136.138:8000/api/' : 'http://47.52.136.138:8000/api/'
