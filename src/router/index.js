import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/MainPage'
import BuyPower from '@/components/BuyPower';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children: [
        { path: '', component: BuyPower },
      ]
    }
  ]
})
