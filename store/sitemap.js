/**
 * 归档
 */

import service from '../api'


export const state = () => ({
  art: [],

  fetch: false
})

export const mutations = {
  FETCH_ART(state) {
    state.fetch = true
  },

  SET_ART_SUCCESS(state, data) {
    state.art = data
    state.fetch = false
  },

  SET_ART_FILE(state) {
    state.art = []
    state.fetch = false
  }
}

export const actions = {
  // 全部文章列表 sitemap
  async getSitemap({
    commit
  }) {
    commit('FETCH_ART')
    const res = await service.getallArts()
    if (res && res.code === 1) commit('SET_ART_SUCCESS', res.result)
    else commit('SET_ART_FILE')
  }
}
