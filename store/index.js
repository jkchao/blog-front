/* eslint-disable require-await */
export const actions = {
  nuxtServerInit(store, { req }) {
    const isServer = process && process.server;
    // 设备检查类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent;
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/gi.test(userAgent);
    store.commit('options/SET_MOBILE_LAYOUT', isMobile);
    store.commit('options/SET_USER_AGENT', userAgent);

    const initAppData = [
      // 获取信息
      store.dispatch('options/getAdminInfo'),

      // 网站信息
      store.dispatch('options/getOpt'),

      // 标签
      store.dispatch('tag/getTag'),

      // 友情链接
      store.dispatch('link/getLink', {
        page_size: 1000
      })
    ];

    // if (!isMobile) {
    //   initAppData.push(store.dispatch('article/getHotArt'))
    // }

    return Promise.all(initAppData);
  }
};
