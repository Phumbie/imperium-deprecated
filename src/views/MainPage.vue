<template>
  <div id="main-page">
    <top-nav/>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'

export default {
  components: {
    TopNav,
    Footer
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
