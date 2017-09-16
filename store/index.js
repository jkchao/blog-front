import service from '../api'

export const actions = {
  nuxtServerInit (store, { params, route, isServer, req }) {
    // 设备检查类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    store.commit('options/SET_MOBILE_LAYOUT', isMobile)
    store.commit('options/SET_USER_AGENT', userAgent)

    const initAppData = [
      // 获取信息
      store.dispatch('getAdminInfo'),
      
      // 网站信息
      store.dispatch('getOpt'),

      // 标签
      store.dispatch('getTag')
    ]

    if (!isMobile) {
      initAppData.push(store.dispatch('getHotArt'))
    }

    return Promise.all(initAppData)
  },

  // 获取博主用户信息
  async getAdminInfo ({ commit }) {
    const res = await service.getAuth()
    commit('options/SET_ADMIN_INFO', res.result || {})
  },

  // 获取网站信息
  async getOpt ({ commit }) {
    const res = await service.getOpt()
    commit('options/SET_WEB_OPTION', res.result || {})
  },

  // 获取文章
  async getArtList ({ commit }, params = { current_page: 1 }) {
    const res = await service.getArts(params)
    commit('article/SET_ART', res.result || { pagination: {}, list: [] })
  },

  // 获取最热文章列表
  async getHotArt ({ commit }) {
    const res = await service.getArts({ hot: true })
    commit('article/SET_HOT_ART', res.result || { pagination: {}, list: [] })
  },

  // 获取标签
  async getTag ({ commit }) {
    const res = await service.getTag({ page_size: 100 })
    commit('tag/SET_TAG', res.result || { pagination: {}, list: [] })
  },

  // 文章详情
  async getArt ({ commit }, data) {
    const res = await service.getArt(data)
    commit('article/SET_DETAILS', res.result || {})
  },

  // 喜欢文章
  async likeArt () {},

  // 英雄版
  async getHero ({ commit }, data) {
    const res = await service.getHero({ current_page: 1 })
    commit('heros/SET_HERO', res.result || { pagination: {}, list: [] })
  },

  // 添加英雄版
  async postHero ({ commit }, data) {
    const res = await service.postHero(data)
    return res
  }
}
