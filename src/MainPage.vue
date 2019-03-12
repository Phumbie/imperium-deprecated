<template>
  <div id="main-page">
    <top-nav/>
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
  padding-top: 38px;
}

#top-nav{
  width: 90%;
  margin: 0 auto;
  border: solid 1px #000000;
  
  .top-section, .bottom-section{
    width: 100%;
    display: flex;
  }

  .top-section{
    border-bottom: solid 1px #000000;
  }

  .nav-item, .product-title{
    width: 25%;
    background: bisque;
    border-right: solid 1px #000000;
    padding-top: 25px;
    padding-bottom: 25px;
    text-align: center;
    // float: left;
  }

  .product-title{
    width: 50%;
    font-size: 32px;
    padding-top: 15px;
    // float: left;
  }
}
</style>
