<template>
  <div id="login-section">
    <form>
      <div class="header-text-28">Login</div>
      <input type="text" placeholder="Email address" class="text-field">
      <input type="text" placeholder="Password" class="text-field">
      <div class="buttons">
        <button class="border-none">Forgot your password?</button>
        <button class="border-none" @click="goTo('/signup')">Create account</button>
        <button>Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },

  methods: {
    goTo(page) {
      this.$router.push(page); 
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
