export const state = () => ({
  data: {
    list: [],
    pagination: {}
  }
})

export const mutations = {
  SET_HERO (state, data) {
    state.data = data
  }
}
