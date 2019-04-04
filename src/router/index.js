import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/MainPage'
// import BuyPower from '@/components/BuyPower';
import PaasSubscriptionPlan from '@/components/PaasSubscriptionPlan';
import BuyProducts from '@/components/BuyProducts';
import ProductView from '@/components/ProductView';
import ShoppingCart from '@/components/ShoppingCart';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import CheckoutPage from '@/CheckoutPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainPage,
      children: [
        { path: '', component: PaasSubscriptionPlan },
        { path: 'product-catalogue', component: BuyProducts },
        { path: 'product', component: ProductView },
        { path: 'cart', component: ShoppingCart },
        { path: 'Login', component: Login },
        { path: 'Signup', component: Signup }
      ]
    },
    {
      path: '/checkout',
      name: 'CheckoutPage',
      component: CheckoutPage,
    }
  ]
})
