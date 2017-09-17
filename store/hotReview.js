export const state = () => ({
  data: {
    list: [],
    pagination: {}
  }
})

export const mutations = {
  SET_HOT_REVIEW (state, data) {
    state.data = data
  }
}
