/**
 *
 * book
 */

export const state = () => ({
  data: {
    list: [],
    pagination: {}
  },

  fetch: false
})

export const mutations = {
  // 获取列表
  FETCH_BOOK (state) {
    state.fetch = true
  },

  // 成功
  SET_BOOK_SUCCESS (state, data) {
    state.data = data
    state.fetch = false
  },

  // 失败
  SET_BOOK_FILE (state, data) {
    state.data = { list: [], pagination: {} }
    state.fetch = false
  }
}
