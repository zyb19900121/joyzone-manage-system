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
  },

  /*----------------------------------------游戏类型管理相关接口-----------------------------------------*/

  getGameTypeList: {
    //获取游戏公司列表
    url: "/manage/gameType",
    method: "GET",
    baseUrl
  },
  addGameType: {
    //添加新游戏类型
    url: "/manage/gameType",
    method: "POST",
    baseUrl
  },
  updateGameType: {
    //修改游戏类型
    url: "/manage/gameType",
    method: "PUT",
    baseUrl
  },
  getGameTypeById: {
    //根据id获取类型详情
    url: "/manage/gameType",
    method: "GET",
    baseUrl
  },
  deleteGameType: {
    //删除游戏类型
    url: "/manage/gameType",
    method: "DELETE",
    baseUrl
  },

  /*----------------------------------------游戏资讯相关接口-----------------------------------------*/

  getNewsList: {
    //获取游戏资讯列表
    url: "/manage/gameNews",
    method: "GET",
    baseUrl
  },
  getNewsById: {
    //根据ID获取游戏资讯
    url: "/manage/gameNews",
    method: "GET",
    baseUrl
  },
  addNews: {
    //添加游戏资讯
    url: "/manage/gameNews",
    method: "POST",
    baseUrl
  },
  updateNews: {
    //更新资讯
    url: "/manage/gameNews",
    method: "PUT",
    baseUrl
  },
  deleteNews: {
    //删除游戏资讯
    url: "/manage/gameNews",
    method: "DELETE",
    baseUrl
  },

  /*----------------------------------------游戏图集相关接口-----------------------------------------*/
  getGameGalleryList: {
    //获取游戏图集列表
    url: "/manage/gameGallery",
    method: "GET",
    baseUrl
	},
	addGameGallery: {
    //添加游戏图片
    url: "/manage/gameGallery",
    method: "POST",
    baseUrl
  },
  deleteGameGalleryImage: {
    //删除游戏图片
    url: "/manage/gameGallery",
    method: "DELETE",
    baseUrl
  }
};

export { baseUrl, apiConfig };
