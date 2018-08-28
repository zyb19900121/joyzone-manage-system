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
        name: "index"
      }
    },
    {	//登录页面
      path: "/login",
      name: "login",
      meta: {
        requireAuth: false
      },
      component: () =>
        import(/* webpackChunkName: "myGame" */ "views/Login.vue")
    },
    {	//首页
      path: "/",
      name: "index",
      meta: {
        requireAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "myGame" */ "views/Index.vue"),
      children: [
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
