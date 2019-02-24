/**
 * aiticle
 */

import service from '../api';

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

  // 相关文章推荐
  relativeList: [],

  fetch: false,

  // 文章详情
  details: {}
});

export const mutations = {
  FETCH_ART(state) {
    state.fetch = true;
    state.art = {
      pagination: {},
      list: []
    };
  },

  SET_ART_FILE(state) {
    state.fetch = false;
  },

  SET_HOT_ART(state, data) {
    state.hotArt = data;
  },

  SET_ART_SUCCESS(state, data) {
    state.art = data;
    state.fetch = false;
  },

  SET_ART_FAIL(state) {
    state.art = {
      pagination: {},
      list: []
    };
    state.fetch = false;
  },

  SET_DETAILS(state, data) {
    state.details = data;
  },

  ADD_COMMENT(state) {
    state.details.meta.comments += 1;
  },

  SET_RELATIVE_ART_LIST(state, list) {
    state.relativeList = list.filter(item => item.id !== state.details.id);
  }
};

export const actions = {
  // 获取文章
  async getArtList(
    { commit, state },
    data = {
      current_page: 1
    }
  ) {
    commit('FETCH_ART');
    const res = await service.getArts({
      ...data,
      page_size: data.page_size || 6
    });
    if (res && res.code === 1) {
      if (!process.client) {
        commit('SET_ART_SUCCESS', res.result);
      } else
        setTimeout(() => {
          commit('SET_ART_SUCCESS', res.result);
        }, 200);
    } else commit('SET_ART_FILE');
  },

  // 获取最热文章列表
  async getHotArt({ commit }) {
    const res = await service.getArts({
      hot: true
    });
    commit(
      'SET_HOT_ART',
      res.result || {
        pagination: {},
        list: []
      }
    );
  },

  // 文章详情
  async getArt({ commit, dispatch }, data) {
    const res = await service.getArt(data);
    commit('SET_DETAILS', res.result || {});
  },

  async getRelativeList({ commit, state }, data) {
    const list = await service.getArts({
      tag: state.details.tag[0]._id || 0,
      current_page: 1,
      page_size: 4
    });
    commit('SET_RELATIVE_ART_LIST', list.result.list || []);
  },

  // 喜欢文章
  async likeArt({ commit }, data) {
    const res = await service.likeArt({
      ...data,
      type: 0
    });
    return res;
  }
};
