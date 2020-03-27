import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/views/MainPage";
import LoginSignup from "@/views/LoginSignup";
import PaasPage from "@/views/PaasPage";
import PaasSubscriptionPlan from "@/components/PaasSubscriptionPlan";
import PaasPersonalDetails from "@/components/PaasPersonalDetails";
import PaasAccountDetails from "@/components/PaasAccountDetails";
import PaasStatementConfirmation from "@/components/PaasStatementConfirmation";
import PaasApplianceConfiguration from "@/components/PaasApplianceConfiguration";
import BuyProducts from "@/components/BuyProducts";
import ProductView from "@/components/ProductView";
import ShoppingCart from "@/components/ShoppingCart";
import Landing from "@/components/Landing";
import Login from "@/components/Login";
import ForgetPassword from "@/components/ForgetPassword";
import ResetPassword from "@/components/ResetPassword";
import UserAccount from "@/components/UserAccount";
import EditUserAccount from "@/components/EditUserAccount";
import UserOrderHistory from "@/components/UserOrderHistory";
import Signup from "@/components/Signup";
import TermsAndCondition from "@/components/TermsAndCondition";
import CheckoutPage from "@/views/CheckoutPage";
import PageNotFound from "@/views/404";

// [Router, VModal].forEach((x) => Vue.use(x))
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: MainPage,
      children: [
        { path: "", component: Landing },
        { path: "/products", component: BuyProducts },
        {
          path: "paas/appliance-configuration",
          component: PaasApplianceConfiguration
        },
        { path: "power-as-a-service", component: PaasSubscriptionPlan },
        { path: "product/:slug/id/:id", component: ProductView },
        { path: "cart", component: ShoppingCart },
        { path: "/my-account", component: UserAccount },
        { path: "/terms-and-condition", component: TermsAndCondition },
        { path: "/my-account/update", component: EditUserAccount },
        { path: "/my-account/order-history", component: UserOrderHistory }
      ]
    },
    {
      path: "/",
      component: LoginSignup,
      children: [
        { path: "login", component: Login },
        { path: "signup", component: Signup },
        { path: "forget-password", component: ForgetPassword },
        { path: "reset-password", component: ResetPassword },
        { path: "/checkout", name: "CheckoutPage", component: CheckoutPage }
      ]
    },
    {
      path: "/paas",
      component: PaasPage,
      children: [
        { path: "register", component: PaasPersonalDetails },
        { path: "account-details", component: PaasAccountDetails },
        { path: "statement-confirmed", component: PaasStatementConfirmation }
      ]
    },
    { path: "/404", name: "404Page", component: PageNotFound }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
