import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueParticles from "vue-particles";
import router from "./router";
import store from "./store";
import filter from "./utils/filter"; //全局filter

import "src/assets/stylus/index.styl";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueParticles);

//路由拦截(查看localstorage中是否存有token)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("MY_GAME_TOKEN");
  if (to.meta.requireAuth) {
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

//注册全局filter
for (const key in filter) {
  Vue.filter(key, filter[key]);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
