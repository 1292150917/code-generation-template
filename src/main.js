/*
 * @Author: your name
 * @Date: 2020-06-03 21:25:25
 * @LastEditTime: 2020-06-21 18:56:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\app\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios'
import 'highlight.js/styles/monokai-sublime.css'
import viewTheInterToGnerateJSON from './views/TheInterToGnerateJSON'
Vue.prototype.$http = axios
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.component('TheInterToGnerateJSON', viewTheInterToGnerateJSON)
new Vue({
  router,
  data() {
    return {
      surfaceRelevance:[] //表关联
    }
  },
  store,
  render: h => h(App)
}).$mount('#app')
