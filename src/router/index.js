import Vue from 'vue'
import Router from 'vue-router'
import VModal from 'vue-js-modal'

import MainPage from '@/MainPage'
import PaasPage from '@/PaasPage'
import PaasSubscriptionPlan from '@/components/PaasSubscriptionPlan';
import PaasPersonalDetails from '@/components/PaasPersonalDetails';
import PaasAccountDetails from '@/components/PaasAccountDetails';
import PaasApplianceConfiguration from '@/components/PaasApplianceConfiguration';
import BuyProducts from '@/components/BuyProducts';
import ProductView from '@/components/ProductView';
import ShoppingCart from '@/components/ShoppingCart';
import Login from '@/components/Login';
import UserAccount from '@/components/UserAccount';
import Signup from '@/components/Signup';
import CheckoutPage from '@/CheckoutPage'

[Router, VModal].forEach((x) => Vue.use(x))

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage,
      children: [
        { path: '', component: PaasSubscriptionPlan },
        { path: 'paas/appliance-configuration', component: PaasApplianceConfiguration },
        { path: 'product-catalogue', component: BuyProducts },
        { path: 'product', component: ProductView },
        { path: 'cart', component: ShoppingCart },
        { path: 'Login', component: Login },
        { path: 'Signup', component: Signup },
        { path: '/my-account', component: UserAccount }
      ]
    },
    {
      path: '/checkout',
      name: 'CheckoutPage',
      component: CheckoutPage,
    },
    {
      path: '/paas',
      component: PaasPage,
      children: [
        { path: 'personal-details', component: PaasPersonalDetails },
        { path: 'account-details', component: PaasAccountDetails }
      ]
    },
  ]
})
