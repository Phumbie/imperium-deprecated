<template>
  <div id="login-section">
    <form @submit.prevent="createPassword()">
      <div class="small-text">Create new password</div>
      <input
        type="password"
        placeholder="Password"
        class="text-field"
        v-model="password"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        class="text-field"
        v-model="confirmPassword"
        required
      />
      <div class="buttons">
        <input type="submit" value="Create" />
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
      password: "",
      confirmPassword: "",
      hash: this.$route.query.hash,
      id: this.$route.query.id
    };
  },
  beforeRouteEnter(to, from, next) {
    const { id, hash } = to.query;
    if (!id || !hash) {
      return next("/login");
    }
    next();
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    createPassword() {
      let data = {
        password: this.password,
        hash: this.hash,
        id: this.id
      };

      api
        .resetPassword(data)
        .then(response => {
          alert("you can now login with your new password");
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
    input[type="submit"] {
      margin-top: 2rem;
    }
  }
}
</style>
