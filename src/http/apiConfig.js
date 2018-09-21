const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://127.0.0.1:3000"
    : "https://joyzone.xyz";

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
    //删除日志
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
  },

  getGameById: {
    //根据id获取游戏
    url: "/manage/game",
    method: "GET",
    baseUrl
  },

  addGame: {
    //添加新游戏
    url: "/manage/game",
    method: "POST",
    baseUrl
  },

  updateGame: {
    //更新游戏
    url: "/manage/game",
    method: "PUT",
    baseUrl
  },

  deleteGame: {
    //删除游戏
    url: "/manage/game",
    method: "DELETE",
    baseUrl
  },

  /*----------------------------------------文件上传相关接口-----------------------------------------*/

  fileUpload: {
    //文件上传
    url: "/manage/fileUpload",
    method: "POST",
    baseUrl
  },

  /*----------------------------------------游戏公司管理相关接口-----------------------------------------*/

  getGameCompanyList: {
    //获取游戏公司列表
    url: "/manage/gameCompany",
    method: "GET",
    baseUrl
	},
	addGameCompany: {
    //添加新游戏公司
    url: "/manage/gameCompany",
    method: "POST",
    baseUrl
	},
	updateGameCompany: {
    //修改游戏公司
    url: "/manage/gameCompany",
    method: "PUT",
    baseUrl
	},
	getGameCompanyById: {
    //根据id获取公司详情
    url: "/manage/gameCompany",
    method: "GET",
    baseUrl
  },
	deleteGameCompany: {
    //删除游戏公司
    url: "/manage/gameCompany",
    method: "DELETE",
    baseUrl
  }
};

export { baseUrl, apiConfig };
