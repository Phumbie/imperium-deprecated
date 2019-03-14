import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/MainPage'
import BuyPower from '@/components/BuyPower';
import BuyProducts from '@/components/BuyProducts';
import ProductView from '@/components/ProductView';
import ShoppingCart from '@/components/ShoppingCart';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children: [
        { path: '', component: BuyPower },
        { path: 'product-catalogue', component: BuyProducts },
        { path: 'product', component: ProductView },
        { path: 'cart', component: ShoppingCart }
      ]
    }
  ]
})
