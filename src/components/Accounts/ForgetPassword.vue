<template>
  <div id="login-section">
    <form @submit.prevent="resetPassword()">
      <div class="header-text-28">Your email?</div>
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
import { mapActions } from "vuex";
import api from "@/utils/api.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    navigateTo(page) {
      this.$router.push(page);
    },
    resetPassword() {
      let data = {
        email: this.email,
      };

      api
        .forgetPassword(data)
        .then((response) => {
          this.showModal({
            description: "A reset link has been sent to your email.",
            display: true,
            type: "success",
          });
          this.navigateTo("/login");
        })
        .catch(({ response }) => {
          this.showToast({
            description: response.data.message,
            display: true,
            type: "error",
          });
        });
    },
  },
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

    input[type="submit"] {
      margin-bottom: 0;
    }
  }
}
</style>
