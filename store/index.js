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
    if (res.code === 1) commit('options/SET_ADMIN_INFO', res.result)
  },

  // 获取网站信息
  async getOpt ({ commit }) {
    const res = await service.getOpt()
    if (res.code === 1) commit('options/SET_WEB_OPTION', res.result)
  },

  // 获取文章
  async getArtList ({ commit }, params = { current_page: 1 }) {
    const res = await service.getArts(params)
    if (res.code === 1) commit('article/SET_ART', res.result)
  },

  // 获取最热文章列表
  async getHotArt ({ commit }) {
    const res = await service.getArts({ hot: true })
    if (res.code === 1) commit('article/SET_HOT_ART', res.result)
  },

  // 获取标签
  async getTag ({ commit }) {
    const res = await service.getTag({ page_size: 100 })
    if (res.code === 1) commit('tag/SET_TAG', res.result)
  },

  // 文章详情
  async getArt () {},

  // 喜欢文章
  async likeArt () {},

  // 英雄版
  async getHero () {},

  // 添加英雄版
  async postHero () {}
}
