<template>
  <div id="container-main">
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
</style>