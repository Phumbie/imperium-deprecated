<template>
  <div id="login-section">
    <form @submit.prevent="login">
      <div class="header-text-28">Login</div>
      <input
        type="email"
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
    return {};
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.accountModule.loginDetails,
    }),
  },
  methods: {
    ...mapActions("accountModule", ["loginCustomer"]),
    navigateTo(page) {
      this.$router.push(page);
    },

    login() {
      this.loginCustomer(this.details);
    },
  },
};
</script>

<style lang="scss" scoped></style>
