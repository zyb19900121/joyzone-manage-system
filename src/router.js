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
    {
      path: "/login",
      name: "login",
      meta: {
        requireAuth: false
      },
      component: () => import(/* webpackChunkName: "myGame" */ "views/Login.vue")
    },
    {
      path: "/",
      name: "index",
      meta: {
        requireAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "myGame" */ "views/Index.vue"),
      children: [
        {
          path: "accessLog",
          name: "accessLog",
          component: () =>
            import(/* webpackChunkName: "myGame" */ "views/AccessLog/AccessLog.vue"),
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
