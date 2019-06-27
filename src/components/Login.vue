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

      return api
        .loginCustomer(data)
        .then(({ data }) => {
          if(data.status == "success"){
            localStorage.setItem('user_details', JSON.stringify(data.data.user));
            localStorage.setItem('token', data.data.token)
            // console.log(data);
            this.navigateTo("my-account");
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
