<template>
  <div id="login-section">
    <form @submit.prevent="login()">
      <div class="header-text-28">Login</div>
      <input type="text" placeholder="Email address" class="text-field" v-model="email" required>
      <input type="password" placeholder="Password" class="text-field" v-model="password" required>
      <div class="buttons">
        <button class="border-none">Forgot your password?</button>
        <button class="border-none" @click="navigateTo('/signup')">Create account</button>
        <input type="submit" value="Sign in">
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/utils/api.js";

export default {
  name: 'Login',
  data () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page); 
    },
    login(){
      let data = {
        email: this.email,
        password: this.password,
      };

      api
        .loginCustomer(data)
        .then(({ data }) => {
          if(data.status == "success"){
            // localStorage.setItem('user_details', JSON.stringify(data.data.user));
            localStorage.setItem('user_details', JSON.stringify(data.data.customer));
            localStorage.setItem('token', data.data.token)
            this.navigateTo("my-account");
          }
          if(JSON.parse(localStorage.getItem("product_id"))){
            let localCart = JSON.parse(localStorage.getItem("product_id"))
            localCart.map(item => {
              if(item.id === ""){
                return
              }
              api
                .addProductToCart(item.id)
                .then(({ data }) => {
                  this.$store.dispatch("incrementCartCounter");
                  alert("Successfully added product to cart!");
                })
                .catch(({ response }) => {
                  alert(response.data.message);
                });
              })
            }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });       
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
