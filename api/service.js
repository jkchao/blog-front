import ax from './axios'

// 获取用户信息
export function getAuth () {
  return ax.get('/auth')
        .then(res => res.data)
}

// 获取网站配置项
export function getOpt () {
  return ax.get('/option')
        .then(res => res.data)
}

// 英雄版列表
export function getHero (params) {
  return ax.get('/hero', { params })
        .then(res => res.data)
}

// 增加英雄榜
export function postHero (data) {
  return ax.post('/hero', {...data})
          .then(res => res.data)
}

// 标签列表
export function getTag (params) {
  return ax.get('/tag', { params })
        .then(res => res.data)
}

// 获取文章列表
export function getArts (params) {
  return ax.get('/article', { params })
        .then(res => res.data)
}

// 获取单个文章
export function getArt (data) {
  return ax.get(`/article/${data._id}`)
        .then(res => res.data)
}

export function likeArt (data) {
  return ax.puthArt('')
}
