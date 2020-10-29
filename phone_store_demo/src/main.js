/*全局变量*/
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'//根组件
import router from './router'
import store from './store'
/*vant模块*/
import Vant from 'vant'
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
Vue.use(Vant).use(Lazyload);
//阻止启动生产消息
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
