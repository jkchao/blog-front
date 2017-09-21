export const state = () => ({
  data: {
    list: [],
    pagination: {}
  },

  fetch: false
})

export const mutations = {
  FETCH_HERO (state) {
    state.fetch = true
  },

  SET_HERO_SUCCESS (state, data) {
    state.data = data
    state.fetch = false
  },

  SET_HERO_FILE (state, data) {
    state.data = { list: [], pagination: {} }
    state.fetch = false
  }
}
