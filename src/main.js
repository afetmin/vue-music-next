import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './utils/global'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/index.scss'
import { formatNumber } from '@/utils/common'

Vue.config.productionTip = false
Vue.use(global)

Vue.filter('formatNumber', formatNumber)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
