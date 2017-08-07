export const state = () => {
  return {
    isAsidePage: false
  }
}

export const mutations = {
  CHANGE_ASIDE_PAGE (state, data) {
    state.isAsidePage = data
  }
}
