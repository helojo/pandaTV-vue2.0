// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { fixed } from './filters'
import YDUI from 'vue-ydui'
import { InfiniteScroll } from 'mint-ui'
import VideoPlayer from 'vue-video-player'
import 'vue-ydui/dist/ydui.rem.css'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.use(YDUI)
Vue.use(VueResource)
Vue.use(VideoPlayer)
Vue.use(InfiniteScroll)
Vue.filter('fixed', fixed)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
