//初始化数据
const state = {
  userInfo: {}
};

//getter 抛出去的数据
const getters = {
  userInfo: state => state.userInfo
};

//action 异步的操作
const actions = {};

//mutation
const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
