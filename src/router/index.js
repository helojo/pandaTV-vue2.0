import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/home/index'
import game from '@/views/game/index'
import recreation from '@/views/recreation/index'
import live from '@/components/live'
import cateList from '@/views/game/catelist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/room/:id',
      name: 'live',
      component: live
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/recreation',
      name: 'recreation',
      component: recreation
    },
    {
      path: '/game/catelist',
      name: 'cateList',
      component: cateList
    },
  ]
})
