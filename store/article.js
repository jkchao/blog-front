
/**
 * aiticle
 */

import service from '../api'


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
  FETCH_ART(state) {
    state.fetch = true
  },

  SET_HOT_ART(state, data) {
    state.hotArt = data
  },

  SET_ART_SUCCESS(state, data) {
    state.art = data
    state.fetch = false
  },

  SET_ART_FAIL(state) {
    state.art = {
      pagination: {},
      list: []
    }
    state.fetch = false
  },

  SET_DETAILS(state, data) {
    state.details = data
  },

  ADD_COMMENT(state) {
    state.details.meta.comments += 1
  }
}

export const actions = {
  // 获取文章
  async getArtList({
    commit,
    state
  }, data = {
    current_page: 1
  }) {
    commit('FETCH_ART')
    const res = await service.getArts(data)
    if (res && res.code === 1) {
      let list
      if (res.result.pagination.current_page === 1) list = res.result.list
      else list = [...state.art.list, ...res.result.list]
      commit('SET_ART_SUCCESS', {
        list,
        pagination: res.result.pagination
      })
    } else commit('SET_ART_FILE')
  },

  // 获取最热文章列表
  async getHotArt({
    commit
  }) {
    const res = await service.getArts({
      hot: true
    })
    commit('SET_HOT_ART', res.result || {
      pagination: {},
      list: []
    })
  },

  // 文章详情
  async getArt({
    commit
  }, data) {
    const res = await service.getArt(data)
    commit('SET_DETAILS', res.result || {})
  },

  // 喜欢文章
  async likeArt({
    commit
  }, data) {
    const res = await service.likeArt({
      ...data,
      type: 0
    })
    return res
  },
}
