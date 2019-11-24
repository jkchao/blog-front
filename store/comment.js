/*
 *
 * 评论数据状态
 *
 */

import service from '../api';

export const state = () => {
  return {
    fetching: false,
    posting: false,
    data: {
      data: [],
      pagination: {}
    }
  };
};

export const mutations = {
  // 获取评论
  REQUEST_LIST(state) {
    state.fetching = true;
  },

  // 清空评论
  CLEAR_LIST(state) {
    state.data = {
      data: [],
      pagination: {}
    };
  },

  GET_LIST_SUCCESS(state, action) {
    state.fetching = false;
    state.data = action;
  },

  GET_LIST_FAILURE(state) {
    state.fetching = false;
    state.data = {
      data: [],
      pagination: {}
    };
  },

  // 发布评论
  POST_ITEM(state) {
    state.posting = true;
  },

  POST_ITEM_SUCCESS(state, action) {
    state.posting = false;
    state.data.pagination.total += 1;
    state.data.data.unshift(action.result);
  },

  POST_ITEM_FAILURE(state) {
    state.posting = false;
  },

  // 喜欢某条评论
  LIKE_ITEM(state, action) {
    const comment = state.data.data.find(comment => Object.is(comment._id, action._id));
    if (comment) comment.likes++;
  }
};

export const actions = {
  // 提交留言墙
  async postHero({ commit }, data) {
    commit('POST_ITEM');
    const res = await service.postHero(data);
    commit('POST_ITEM_FINAL');
    return res;
  },

  // 发布评论
  async postComment({ commit }, comment) {
    commit('POST_ITEM');
    const res = await service.postComment(comment);
    if (res && res.code === 1) {
      commit('POST_ITEM_SUCCESS', res);
      if (comment.post_id !== 0) commit('article/ADD_COMMENT', null, { root: true });
    } else commit('POST_ITEM_FAILURE');
    return res;
  },

  // 为某条回复点赞
  async likeComment({ commit }, data) {
    const res = await service.likeComment(data);
    if (res && res.code === 1) commit('LIKE_ITEM', data);
    return res;
  },

  // 根据post-id获取评论列表
  async loadCommentsByPostId({ commit, state }, data) {
    data.sort = data.sort || -1;
    data.current_page = data.current_page || 1;
    data.page_size = data.page_size || 100;
    if (Object.is(data.current_page, 1)) {
      // commit('comment/CLEAR_LIST')
    }
    commit('REQUEST_LIST');
    setTimeout(async () => {
      const res = await service.getComment(data);
      if (res && res.code === 1) {
        let list;
        if (res.result.pagination.current_page === 1) list = res.result.data;
        else list = [...state.data.data, ...res.result.data];
        // if (Object.is(data.sort, -1)) res.result.data.reverse()
        commit('GET_LIST_SUCCESS', {
          data: list,
          pagination: res.result.pagination
        });
      } else commit('GET_LIST_FAILURE');
      return res;
    }, 500);
  }
};
