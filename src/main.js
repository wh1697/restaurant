import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//前期配置第二步  安装Element Ui 然后导入main.js
import ElementUI from 'element-ui';   //复制js
import 'element-ui/lib/theme-chalk/index.css';   //复制css
Vue.use(ElementUI);  //复制

// 前期配置第三步 引用icon 图标(在assets里面新建文件夹)
import './assets/fonts/iconfont.css'

// 前期配置第四步 引用公共css(在assets里面新建文件夹)---第五步去public文件夹里面的index.html里面给html,body高度100%
import './assets/css/reset.css'

// 使用Vuex第二步


Vue.config.productionTip = false

new Vue({
  router,
  store,   //新增这个
  render: h => h(App)
}).$mount('#app')
