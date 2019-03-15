<template>
  <div id="normal-products-section">
    <div class="header-text-28">Power your home with our range of products</div> 
    <div class="small-text">Find batteries, inverters, solar panels and more</div>
    <div class="products-container">
      <div class="product-item" v-for="(n, index) in 12" :key="index" @click="goTo('/product')">
        <div class="centered-content">
          <div class="image-container">
            <img src="../assets/images/battery.jpg">
          </div>
          <div class="small-text-18">10kWh Battery</div>
          <div class="small-text-18 text-blue">3 configurations</div>
          <div class="small-text-18 text-blue">Suggested loading</div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
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
#normal-products-section{

  .product-item{
    cursor: pointer;

    .centered-content{
      width: 70%;
    }
  }
}
</style>
