<template>
  <div id="login-section">
    <form @submit.prevent="login()">
      <div class="header-text-28">Login</div>
      <input type="text" placeholder="Email address" v-model="email" required />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
      <div class="buttons">
        <router-link tag="button" to="/forget-password">
          Forgot your password?
        </router-link>
        <input type="submit" value="Sign in" />
        <button @click="navigateTo('/signup')">
          Create account
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/utils/api.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    login() {
      let data = {
        email: this.email,
        password: this.password
      };

      api
        .loginCustomer(data)
        .then(response => {
          if (response.data.status == "success") {
            localStorage.setItem(
              "user_details",
              JSON.stringify(response.data.data.customer)
            );
            localStorage.setItem("token", response.data.data.token);
            this.navigateTo("my-account");
          }
          if (JSON.parse(localStorage.getItem("product_id")).length !== 0) {
            let localCart = JSON.parse(localStorage.getItem("product_id"));
            localCart.map(product => {
              product.product_id = product.id;
              delete product.subtotal;
              delete product.id;
            });
            const payload = { products: localCart };
            api
              .addBulkProductToCart(payload)
              .then(response => {
                if (response) {
                  api
                    .getCart()
                    .then(({ data }) => {
                      if (data.status == "success") {
                        let cartSize = 0;
                        let cartItems = data.data.cart.items;
                        cartItems.forEach(item => {
                          cartSize += item.quantity;
                        });
                        this.$store.dispatch("setCartCounter", cartSize);
                      }
                    })
                    .catch(error => {
                      alert(error.data.data.message);
                    });
                }
              })
              .catch(error => {
                alert(error.data.data.message);
              });
          }
        })
        .catch(error => {
          alert(error.data.data.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
