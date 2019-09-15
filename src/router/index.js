import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/MainPage'
import LoginSignup from '@/views/LoginSignup'
import PaasPage from '@/views/PaasPage'
import PaasSubscriptionPlan from '@/components/PaasSubscriptionPlan';
import PaasPersonalDetails from '@/components/PaasPersonalDetails';
import PaasAccountDetails from '@/components/PaasAccountDetails';
import PaasStatementConfirmation from '@/components/PaasStatementConfirmation';
import PaasApplianceConfiguration from '@/components/PaasApplianceConfiguration';
import BuyProducts from '@/components/BuyProducts';
import ProductView from '@/components/ProductView';
import ShoppingCart from '@/components/ShoppingCart';
import Login from '@/components/Login';
import UserAccount from '@/components/UserAccount';
import EditUserAccount from '@/components/EditUserAccount';
import UserOrderHistory from '@/components/UserOrderHistory';
import Signup from '@/components/Signup';
import CheckoutPage from '@/views/CheckoutPage'

// [Router, VModal].forEach((x) => Vue.use(x))
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage,
      children: [
        { path: '', component: BuyProducts },
        { path: 'paas/appliance-configuration', component: PaasApplianceConfiguration },
        { path: 'power-as-a-service', component: PaasSubscriptionPlan },
        { path: 'product/:slug/id/:id', component: ProductView },
        { path: 'cart', component: ShoppingCart },
        { path: '/my-account', component: UserAccount },
        { path: '/my-account/update', component: EditUserAccount },
        { path: '/my-account/order-history', component: UserOrderHistory }
      ]
    },
    { path: '/checkout', name: 'CheckoutPage',component: CheckoutPage },
    {
      path: '/',
      component:LoginSignup,
      children: [
        { path: 'login', component: Login },
        { path: 'signup', component: Signup },
      ]
    },
    {
      path: '/paas',
      component: PaasPage,
      children: [
        { path: 'register', component: PaasPersonalDetails },
        { path: 'account-details', component: PaasAccountDetails },
        { path: 'statement-confirmed', component: PaasStatementConfirmation }
      ]
    },
  ]
})