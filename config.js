const IS_DEV = process.env.NODE_ENV !== 'production'

export const API_ROOT = IS_DEV ? 'http://localhost:8080' : '/api'
