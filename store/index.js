export const actions = {
  nuxtServerInit (store, { params, route, isServer, req }) {
    // 设备检查类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    store.commit('options/SET_MOBILE_LAYOUT', isMobile)
    store.commit('options/SET_USER_AGENT', userAgent)
  }
}
