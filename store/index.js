export const actions = {
  nuxtServerInit (store, { params, route, isServer, req }) {
    // 设备检查类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    store.commit('options/SET_MOBILE_LAYOUT', isMobile)
    store.commit('options/SET_USER_AGENT', userAgent)
  },

  // 获取博主用户信息
  getAdminInfo () {},

  // 获取网站信息
  getOpt () {},

  // 获取文章
  getArt () {},

  // 获取标签
  getTag () {},

  // 英雄版
  getHero () {},

  // 添加英雄版
  postHero () {}
}
