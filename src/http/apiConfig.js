const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://127.0.0.1:3000"
    : "http://123.207.152.180:3000/";

const apiConfig = {
  // register: { //获取菜单
  // 	url: '/user/register',
  // 	method: 'POST',
  // 	baseUrl
  // }

  //user接口
  login: {
    //用户登陆
    url: "/login",
    method: "POST",
    baseUrl
	},
	/*----------------------------------------评论管理相关接口-----------------------------------------*/ 
	getGameCommentList: {
    //获取评论列表
    url: "/manage/gameComment",
    method: "GET",
    baseUrl
	},
	
	deleteGameComments: {
    //获取评论列表
    url: "/manage/gameComment",
    method: "DELETE",
    baseUrl
  },

	/*----------------------------------------访问日志相关接口-----------------------------------------*/ 
  getLogList: {
    //获取日志列表
    url: "/manage/log",
    method: "GET",
    baseUrl
  },
  deleteLogs: {
    //获取日志列表
    url: "/manage/log",
    method: "DELETE",
    baseUrl
	},
	
	/*----------------------------------------游戏管理相关接口-----------------------------------------*/ 
  getGameList: {
    //获取游戏列表
    url: "/manage/game",
    method: "GET",
    baseUrl
  }
};

export { baseUrl, apiConfig };
