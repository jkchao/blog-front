export const state = () => {
  return {
    // 是否有侧栏
    isAsidePage: false,

    // 是否为移动端
    mobileLayout: false,

    // 移动端侧边栏
    mobileSidebar: false,

    // ua
    userAgent: ''
  }
}

export const mutations = {

  // 侧栏
  CHANGE_ASIDE_PAGE (state, data) {
    state.isAsidePage = data
  },

  // 设置UA
  SET_USER_AGENT (state, action) {
    state.userAgent = action
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT (state, action) {
    state.mobileLayout = action
  },

  // 设置是否移动端状态
  SET_MOBILE_SIDEBAR (state, action) {
    state.mobileSidebar = action
  }
}

export const getters = {
  mobileLayout: state => state.mobileLayout
}
