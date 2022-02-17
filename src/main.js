import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router";
import store from "./store";

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title){
    document.title = to.meta.title
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        next()
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
  next()
  }
)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


