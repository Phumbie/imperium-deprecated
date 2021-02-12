import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/views/MainPage";
import LoginSignup from "@/views/LoginSignup";
import PaasPage from "@/views/PaasPage";
import store from "@/store";

// import PaasPage from "@/views/PaasPage";
// import PaasPersonalDetails from "@/components/PaasPersonalDetails";
// import PaasAccountDetails from "@/components/PaasAccountDetails";
// import PaasStatementConfirmation from "@/components/PaasStatementConfirmation";

// [Router, VModal].forEach((x) => Vue.use(x))
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: MainPage,
      children: [
        {
          path: "",
          component: () => import("@/components/Landing"),
          hidden: true,
        },
        {
          path: "/products/:page",
          component: () => import("@/components/BuyProducts"),
          hidden: true,
          name: "products",
        },
        {
          path: "/products/search/:id",
          component: () => import("../views/Search"),
          hidden: true,
        },
        {
          path: "paas/appliance-configuration",
          component: () => import("@/components/PaasApplianceConfiguration"),
          hidden: true,
        },
        {
          path: "power-as-a-service",
          component: () => import("@/components/PaasSubscriptionPlan"),
          hidden: true,
        },
        {
          path: "product/:slug/id/:id",
          component: () => import("@/components/ProductView"),
          hidden: true,
        },
        {
          path: "cart",
          component: () => import("@/components/ShoppingCart"),
          hidden: true,
        },
        {
          path: "/my-account/:page",
          component: () => import("@/components/UserAccount"),
          hidden: true,
        },
        {
          path: "/terms-and-condition",
          component: () => import("@/components/TermsAndCondition"),
          hidden: true,
        },
        {
          path: "/my-account/update",
          component: () => import("@/components/EditUserAccount"),
          hidden: true,
        },
        {
          path: "/order-history",
          component: () => import("@/components/UserOrderHistory"),
          hidden: true,
        },
        {
          path: "/user/confirm",
          component: () => import("@/components/Confirm"),
          hidden: true,
        },
      ],
    },
    {
      path: "/",
      component: LoginSignup,
      children: [
        {
          path: "/login",
          component: () => import("@/views/Login"),
          hidden: true,
        },
        {
          path: "/signup",
          component: () => import("@/views/Signup"),
          hidden: true,
        },
        {
          path: "/forget-password",
          component: () => import("@/components/Accounts/ForgetPassword"),
          hidden: true,
        },
        {
          path: "/reset-password",
          component: () => import("@/components/ResetPassword"),
          hidden: true,
        },
        {
          path: "/checkout",
          component: () => import("@/views/CheckoutPage"),
          hidden: true,
          beforeEnter(to, from, next) {
            if (store.getters.cartCounter == 0) {
              next({
                name: "products",
              });
            } else {
              next();
            }
          },
        },
      ],
    },
    {
      path: "/",
      component: PaasPage,
      children: [
        {
          path: "/calculator",
          component: () => import("@/components/Calculator"),
          hidden: true,
        },
        {
          path: "/calculator-result",
          component: () => import("@/components/CalculatorResult"),
          hidden: true,
        },
        {
          path: "/request-audit",
          component: () => import("@/components/RequestAudit"),
          hidden: true,
        },
      ],
    },
    {
      path: "/specta",
      component: () => import("@/components/PayWithSpecta"),
      hidden: true,
    },
    {
      path: "*",
      component: () => import("@/views/404"),
      hidden: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
