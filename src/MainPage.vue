<template>
  <div id="main-page">
    <top-nav/>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'

export default {
  components: {
    TopNav
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#main-page{
  width: 80%;
  margin: 0 auto;
}
</style>
