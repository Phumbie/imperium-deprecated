<template>
  <div id="login-section">
    <form @submit.prevent="resetPassword()">
      <div class="header-text-28">Forget password?</div>
      <input type="text" placeholder="Email address" v-model="email" required />
      <div class="buttons">
        <input type="submit" value="Submit" />
        <button @click="navigateTo('/login')">
          Login
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
      email: ""
    };
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    resetPassword() {
      let data = {
        email: this.email
      };

      api
        .forgetPassword(data)
        .then(response => {
          alert("reset link sent");
          this.navigateTo("/login");
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#login-section {
  form {
    width: 34%;

    @media screen and (max-width: 1200px) {
      width: 40%;
    }

    @media screen and (max-width: 1024px) {
      width: 50%;
    }

    @media screen and (max-width: 900px) {
      width: 60%;
    }

    @media screen and (max-width: 600px) {
      width: 100%;
    }
    input {
      margin-bottom: 2rem;
    }
    input[type="submit"] {
      margin-bottom: 0;
    }
  }
}
</style>
