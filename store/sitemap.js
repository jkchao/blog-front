export const state = () => ({
  art: {
    list: [],
    pagination: {}
  },

  fetch: false
})

export const mutations = {
  FETCH_ART (state) {
    state.fetch = true
  },

  SET_ART_SUCCESS (state, data) {
    state.art = data
    state.fetch = false
  },

  SET_ART_FAIL (state) {
    state.art = { pagination: {}, list: [] }
    state.fetch = false
  }
}
