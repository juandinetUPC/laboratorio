import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import router from './router'

Vue.use(vueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})