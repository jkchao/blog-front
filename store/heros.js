export const state = () => ({
  data: {
    list: [],
    pagination: {}
  },

  fetch: false,
  posting: false
})

export const mutations = {
  // 获取列表
  FETCH_HERO (state) {
    state.fetch = true
  },

  // 成功
  SET_HERO_SUCCESS (state, data) {
    state.data = data
    state.fetch = false
  },

  // 失败
  SET_HERO_FILE (state, data) {
    state.data = { list: [], pagination: {} }
    state.fetch = false
  },

  // 发布留言板
  POST_ITEM (state) {
    state.posting = true
  },

  POST_ITEM_FINAL (state, action) {
    state.posting = false
  }
}
