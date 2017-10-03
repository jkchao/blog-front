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
      initAppData.push(store.dispatch('getHotReview'))
    }

    return Promise.all(initAppData)
  },

  // 获取博主用户信息
  async getAdminInfo ({ commit }) {
    const res = await service.getAuth()
    commit('options/SET_ADMIN_INFO', res.result || {})
  },

  // 获取网易云热评
  async getHotReview ({ commit }) {
    const res = await service.getHotReview()
    commit('hotReview/SET_HOT_REVIEW', res.result || {})
  },

  // 获取网站信息
  async getOpt ({ commit }) {
    const res = await service.getOpt()
    commit('options/SET_WEB_OPTION', res.result || {})
  },

  // 获取文章
  async getArtList ({ commit, state }, data = { current_page: 1 }) {
    commit('article/FETCH_ART')
    const res = await service.getArts(data)
    if (res.code === 1) {
      let list
      if (res.result.pagination.current_page === 1) list = res.result.list
      else list = [...state.article.art.list, ...res.result.list]
      commit('article/SET_ART_SUCCESS', {
        list,
        pagination: res.result.pagination
      })
    } else commit('article/SET_ART_FILE')
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
  async likeArt ({ commit }, data) {
    const res = await service.likeArt({ ...data, type: 0 })
    return res
  },

  // 根据post-id获取评论列表
  async loadCommentsByPostId ({ commit }, data) {
    data.sort = data.sort || -1
    data.current_page = data.current_page || 1
    data.page_size = data.page_size || 20
    if (Object.is(data.current_page, 1)) {
      commit('comment/CLEAR_LIST')
    }
    commit('comment/REQUEST_LIST')
    const res = await service.getComment(data)
    if (res.code === 1) {
      if (Object.is(data.sort, -1)) res.result.data.reverse()
      commit('comment/GET_LIST_SUCCESS', res)
    } else commit('comment/GET_LIST_FAILURE')
    return res
  },

  // 发布评论
  async postComment ({ commit }, comment) {
    commit('comment/POST_ITEM')
    const res = await service.postComment(comment)
    if (res.code === 1) {
      commit('comment/POST_ITEM_SUCCESS', res)
      commit('article/ADD_COMMENT')
    } else commit('comment/POST_ITEM_FAILURE')
    return res
  },

  // 为某条回复点赞
  async likeComment ({ commit }, data) {
    const res = await service.likeComment(data)
    if (res.code === 1) commit('comment/LIKE_ITEM', data)
    return res
  },

  // 留言版
  async getHero ({ commit, state }, data = { current_page: 1 }) {
    commit('heros/FETCH_HERO')
    const res = await service.getHero(data)
    if (res.code === 1) {
      let list
      if (res.result.pagination.current_page === 1) list = res.result.list
      else list = [...state.heros.data.list, ...res.result.list]
      commit('heros/SET_HERO_SUCCESS', {
        list,
        pagination: res.result.pagination
      })
    } else commit('heros/SET_HERO_FILE')
    return res
  },

  // 提交留言版
  async postHero ({ commit }, data) {
    commit('heros/POST_ITEM')
    const res = await service.postHero(data)
    commit('heros/POST_ITEM_FINAL')
    return res
  }
}
