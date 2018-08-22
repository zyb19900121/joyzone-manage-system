import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";

import "src/assets/stylus/index.styl";

Vue.config.productionTip = false;

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("MY_GAME_TOKEN");
  if (to.meta.requireAuth) {
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else if (!to.meta.requireAuth && token) {
    next("/index");
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
