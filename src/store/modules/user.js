//初始化数据
const state = {
  userInfo:
    window.localStorage.getItem("USER_INFO") &&
    JSON.parse(window.localStorage.getItem("USER_INFO"))
};

//getter 抛出去的数据
const getters = {
  isAdmin(state) {
		return Boolean(state.userInfo.isAdmin)
	}
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
