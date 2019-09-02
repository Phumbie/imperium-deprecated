<template>
  <div id="normal-products-section">
    <div class="header-text-28">Power your home with our range of products</div> 
    <div class="small-text">Find batteries, inverters, solar panels and more</div>
    <div class="products-container" v-if="fetchedProducts">
      <div 
        class="product-item" 
        v-for="(product, index) in productsList" 
        :key="index" 
        @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
      >
        <div class="centered-content">
          <div class="image-container">
            <img :src="product.display_image">
          </div>
          <div class="small-text-18">{{ product.name }}</div>
          <div class="small-text-18 text-blue">
            ₦{{ (product.price/100).toLocaleString() }}
          </div>
          <div class="small-text-18 text-blue">
            {{ product.capacity }} KV
          </div>
          <!-- <div class="small-text-18 text-blue">3 configurations</div> -->
          <!-- <div class="small-text-18 text-blue">Suggested loading</div> -->
        </div>
      </div>
    </div>
    <content-loader v-else>
      <span>Fetching products...</span>
    </content-loader>
  </div> 
</template>

<script>
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader"

export default {
  components: {
    contentLoader
  },
  data () {
    return {
      productsList: [],
      fetchedProducts: false
    }
  },
  mounted(){
    this.fetchProducts();
  },
  methods: {
     navigateTo(page) {
      this.$router.push(page);
    },
    fetchProducts(){
      api
        .getAllProducts()
        .then(({ data }) => {
          this.productsList = data.data.result;
          this.fetchedProducts = true;
          // console.log(this.productsList);
        })
        .catch(({ response }) => {
      
        });
    }
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
