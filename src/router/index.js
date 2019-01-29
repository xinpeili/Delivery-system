import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods'
import Ratings from '../components/ratings'
import Seller from '../components/seller'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },{
      path: '/goods',
      component: Goods
    },{
      path: '/ratings',
      component: Ratings
    },{
      path: '/seller',
      component: Seller
    }
  ]
})
