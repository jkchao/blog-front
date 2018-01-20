/**
 * aiticle
 */

export const state = () => ({

  // 热门文章
  hotArt: {
    pagination: {},
    list: []
  },

  // 列表文章
  art: {
    pagination: {},
    list: []
  },

  fetch: false,

  // 文章详情
  details: {}
})

export const mutations = {
  FETCH_ART (state) {
    state.fetch = true
  },

  SET_HOT_ART (state, data) {
    state.hotArt = data
  },

  SET_ART_SUCCESS (state, data) {
    state.art = data
    state.fetch = false
  },

  SET_ART_FAIL (state) {
    state.art = { pagination: {}, list: [] }
    state.fetch = false
  },

  SET_DETAILS (state, data) {
    state.details = data
  },

  ADD_COMMENT (state) {
    state.details.meta.comments += 1
  }
}
