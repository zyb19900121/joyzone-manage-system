import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: {
        path: "/gameManage"
      }
    },
    {
      //登录页面
      path: "/login",
      name: "login",
      meta: {
        requireAuth: false
      },
      component: () =>
        import(/* webpackChunkName: "myGame" */ "views/Login.vue")
    },
    {
      //首页
      path: "/",
      name: "index",
      meta: {
        requireAuth: true
      },
      redirect: {
        name: "gameManage"
      },
      component: () =>
        import(/* webpackChunkName: "myGame" */ "views/Index.vue"),
      children: [
        {
          //游戏管理
          path: "gameManage",
          name: "gameManage",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/GameManage/GameManage.vue"),
          meta: {
            requireAuth: true
          },
          redirect: {
            name: "gameList"
          },
          children: [
            {
              //游戏列表
              path: "gameList",
              name: "gameList",
              component: () =>
                import(/* webpackChunkName: "myGame" */ "views/GameManage/GameList.vue"),
              meta: {
                requireAuth: true
              }
            },
            {
              //添加游戏
              path: "addGame",
              name: "addGame",
              component: () =>
                import(/* webpackChunkName: "myGame" */ "views/GameManage/AddGame.vue"),
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          //游戏资讯管理
          path: "gameNewsManage",
          name: "gameNewsManage",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/GameNewsManage/GameNewsManage.vue"),
          meta: {
            requireAuth: true
          },
          redirect: {
            name: "gameNewsList"
          },
          children: [
            {
              //游戏资讯列表
              path: "gameNewsList",
              name: "gameNewsList",
              component: () =>
                import(/* webpackChunkName: "myGame" */ "views/GameNewsManage/GameNewsList.vue"),
              meta: {
                requireAuth: true
              }
            },
            {
              //添加资讯
              path: "addNews",
              name: "addNews",
              component: () =>
                import(/* webpackChunkName: "myGame" */ "views/GameNewsManage/AddNews.vue"),
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          //添加游戏
          path: "addGame",
          name: "addGame",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/GameManage/AddGame.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          //游戏图集管理
          path: "gameGalleryManage",
          name: "gameGalleryManage",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/GameGalleryManage/GameGalleryList.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          //游戏类型管理
          path: "gameTypeManage",
          name: "gameTypeManage",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/ConfigManage/GameTypeManage.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          //游戏厂商管理
          path: "gameCompanyManage",
          name: "gameCompanyManage",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/ConfigManage/GameCompanyManage.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          //访问日志
          path: "accessLog",
          name: "accessLog",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/AccessLog/AccessLog.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          //评论管理
          path: "commentManage",
          name: "commentManage",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/CommentManage/CommentManage.vue"),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "aboutUs",
          name: "aboutUs",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/AboutUs/AboutUs.vue"),
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
});
