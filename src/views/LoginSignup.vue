<template>
  <div id="login-signup">
    <top-nav/>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'

export default {
  components: {
    TopNav,
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#login-signup{
  width: 80%;
  margin: 0 auto;
}
</style>