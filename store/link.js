/**
 *
 * link
 */

export const state = () => ({
  data: {
    list: [],
    pagination: {}
  },

  fetch: false
})

export const mutations = {

  // 成功
  SET_LINK_SUCCESS (state, data) {
    state.data = data
    state.fetch = false
  },

  // 失败
  SET_LINK_FILE (state, data) {
    state.data = { list: [], pagination: {} }
    state.fetch = false
  }
}
