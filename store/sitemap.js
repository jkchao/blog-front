/**
 * 归档
 */

export const state = () => ({
  art: [],

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

  SET_ART_FILE (state) {
    state.art = []
    state.fetch = false
  }
}
