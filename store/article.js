export const state = () => ({

  // 热门文章
  hotArt: {
    pagination: {},
    list: {}
  },

  // 列表文章
  art: {},

  // 文章详情
  details: {}
})

export const mutations = {

  SET_HOT_ART (state, data) {
    state.hotArt = data
  },

  SET_ART (state, data) {
    state.art = data
  },

  SET_DETAILS (state, data) {
    state.details = data
  }
}
