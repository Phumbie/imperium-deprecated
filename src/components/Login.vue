<template>
  <div id="login-section">
    <form @submit.prevent="login()">
      <div class="header-text-28">Login</div>
      <input
        type="text"
        placeholder="Email address"
        v-model="details.email"
        required
      />
      <input
        type="password"
        placeholder="Password"
        v-model="details.password"
        required
      />
      <div class="buttons">
        <button class="login-btn">
          <span>Login</span><span class="loader" v-if="loading"></span>
        </button>
        <router-link tag="button" to="/forget-password">
          Forgot your password?
        </router-link>
        <button @click="navigateTo('/signup')">
          Don't have an account? Create account
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import api from "@/utils/api.js";
  import contentLoader from "@/components/contentLoader";

  export default {
    name: "Login",
    data() {
      return {
        details: {
          email: "",
          password: "",
        },
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.loading,
      }),
    },
    methods: {
      ...mapActions("notificationModule", ["showModal"]),
      ...mapActions("accountModule", ["loginCustomer"]),
      navigateTo(page) {
        this.$router.push(page);
      },

      login() {
        this.loginCustomer(this.details);
        //   this.loading = false;
        //   let data = {
        //     email: this.email,
        //     password: this.password,
        //   };
        //   api
        //     .loginCustomer(this.details)
        //     .then((response) => {
        //       if (response.data.status == "success") {
        //         localStorage.setItem(
        //           "user_details",
        //           JSON.stringify(response.data.data)
        //         );
        //         localStorage.setItem("token", response.data.data.token);
        //         this.navigateTo("my-account");
        //         this.loading = true;
        //       }
        //       if (JSON.parse(localStorage.getItem("product_id")).length !== 0) {
        //         let localCart = JSON.parse(localStorage.getItem("product_id"));
        //         localCart.map((product) => {
        //           product.product_id = product.id;
        //           delete product.subtotal;
        //           delete product.id;
        //         });
        //         const payload = { products: localCart };
        //         api
        //           .addBulkProductToCart(payload)
        //           .then((response) => {
        //             if (response) {
        //               api
        //                 .getCart()
        //                 .then(({ data }) => {
        //                   if (data.status == "success") {
        //                     let cartSize = 0;
        //                     let cartItems = data.data.cart.items;
        //                     cartItems.forEach((item) => {
        //                       cartSize += item.quantity;
        //                     });
        //                     this.$store.dispatch("setCartCounter", cartSize);
        //                   }
        //                 })
        //                 .catch((error) => {
        //                   alert(error.data.data.message);
        //                 });
        //             }
        //           })
        //           .catch((error) => {
        //             alert(error.data.data.message);
        //           });
        //       }
        //     })
        //     .catch((error) => {
        //       this.showModal({
        //         description: "Invalid account.",
        //         display: true,
        //         type: "error",
        //       });
        //       this.loading = true;
        //     });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
