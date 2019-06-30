<template>
<div id="sticky-wrapper">
  <div id="nav-container">
    <div class="top-section">
      <router-link to="/my-account" class="nav-item">
        Account
      </router-link>
      <div class="product-title">Alt Power</div>
      <router-link to="/cart" class="nav-item">
        Shopping cart ({{ cartCounter }})
      </router-link>
    </div>
    <div class="bottom-section">
      <a href="https://renewable-calculator.surge.sh/" target="blank" class="nav-item">Energy Calculator</a>
      <router-link to="/" class="nav-item">Buy Power</router-link>
      <router-link to="/product-catalogue" class="nav-item">Buy Products</router-link>
      <div class="nav-item">Blog</div>
    </div>
  </div>
</div>
 
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TopNav',
  data () {
    return {
      // cartCounter: 0
    }
  },
  computed: {
    ...mapGetters([
      'cartCounter'
    ])
  },
}
</script>

<style lang="scss" scoped>
#sticky-wrapper{
  position: sticky;
  position: -webkit-sticky;
  margin-top: 38px;
  top: 0;
  z-index: 10;
  width: 100%;
}
#nav-container{
  border: solid 1px #000000;
  width: 100%;
  border-right: none;
  
  .top-section, .bottom-section{
    width: 100%;
    display: flex;
  }

  .top-section{
    border-bottom: solid 1px #000000;
  }

  .nav-item, .product-title{
    width: 25%;
    // background: bisque;
    background: white;
    border-right: solid 1px #000000;
    padding-top: 25px;
    padding-bottom: 25px;
    text-align: center;
    text-decoration: none;
    color: black;
    transition: 0.5s;
    cursor: pointer;
  }

  .nav-item:hover{
    background: #000000;
    color: white;
    transition: 0.5s;
  }

  .product-title{
    width: 50%;
    font-size: 32px;
    padding-top: 15px;
  }
}
</style>
