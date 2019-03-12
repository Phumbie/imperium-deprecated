<template>
  <div id="top-nav">
    <div class="top-section">
      <div class="nav-item">Something</div>
      <div class="product-title">Alt Power</div>
      <div class="nav-item">Shopping cart (0)</div>
    </div>
    <div class="bottom-section">
      <div class="nav-item">Energy Calculator</div>
      <div class="nav-item">Buy Power</div>
      <div class="nav-item">Buy Products</div>
      <div class="nav-item">Blog</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
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
