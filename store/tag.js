
import service from '../api'


export const state = () => ({
  data: {}
})

export const mutations = {
  SET_TAG(state, data) {
    state.data = data
  }
}


export const actions = {
  // 获取标签
  async getTag({
    commit
  }) {
    const res = await service.getTag({
      page_size: 100
    })
    commit('SET_TAG', res.result || {
      pagination: {},
      list: []
    })
  },
}