/**
 * 留言板
 */

import service from '../api'


export const state = () => ({
  data: {
    list: [],
    pagination: {}
  },

  fetch: false,
  posting: false
})

export const mutations = {
  // 获取列表
  FETCH_HERO(state) {
    state.fetch = true
  },

  // 成功
  SET_HERO_SUCCESS(state, data) {
    state.data = data
    state.fetch = false
  },

  // 失败
  SET_HERO_FILE(state, data) {
    state.data = {
      list: [],
      pagination: {}
    }
    state.fetch = false
  },

  // 发布留言板
  POST_ITEM(state) {
    state.posting = true
  },

  POST_ITEM_FINAL(state, action) {
    state.posting = false
  }
}


export const actions = {
  // 留言墙
  async getHero({
    commit,
    state
  }, data = {
    current_page: 1
  }) {
    commit('FETCH_HERO')
    const res = await service.getHero(data)
    if (res && res.code === 1) {
      let list
      if (res.result.pagination.current_page === 1) list = res.result.list
      else list = [...state.data.list, ...res.result.list]
      commit('SET_HERO_SUCCESS', {
        list,
        pagination: res.result.pagination
      })
    } else commit('SET_HERO_FILE')
    return res
  },

  // 提交留言墙
  async postHero ({ commit }, data) {
    commit('POST_ITEM')
    const res = await service.postHero(data)
                .catch(err => console.error(err))
    commit('POST_ITEM_FINAL')
    return res
  },
}