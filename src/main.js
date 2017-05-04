// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { fixed } from './filters'
import YDUI from 'vue-ydui'
import VideoPlayer from 'vue-video-player'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'vue-ydui/dist/ydui.rem.css'

Vue.config.productionTip = false

Vue.use(YDUI)
Vue.use(VueResource)
Vue.use(VideoPlayer)
Vue.use(MintUI)
Vue.filter('fixed', fixed)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
