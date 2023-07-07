
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';



import axios from "axios"
// console.log(axios);
// 会把axios挂载在vue的原型上，所有的vue实例都可以使用
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(Vant)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

