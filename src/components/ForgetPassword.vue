<template>
  <div id="login-section">
    <form @submit.prevent="resetPassword()">
      <div class="small-text">Reset link would be sent to your email</div>
      <input
        type="email"
        placeholder="Email address"
        class="text-field"
        v-model="email"
        required
      />
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
  .small-text {
    width: 100%;
    margin-bottom: 0;
  }

  form {
    input {
      margin-bottom: 2rem;
    }
    input[type="submit"] {
      margin-bottom: 0;
    }
  }
}
</style>
