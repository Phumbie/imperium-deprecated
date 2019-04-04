<template>
  <div id="paas-page">
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
#paas-page{
  width: 80%;
  margin: 0 auto;
}
</style>
