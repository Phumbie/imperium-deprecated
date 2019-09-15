<template>
  <div id="normal-products-section">
    <div class="header-text-28">Power your home with our range of products</div> 
    <div class="small-text">Find batteries, inverters, solar panels and more</div>
    <div class="nav-desc-conf-set">
      <div class="nav-link" @click="activeTabID = 0">
        <span class="nav-desc-conf-set__item">
          Batteries
          <div class="line-black" v-if="activeTabID == 0"></div>
        </span> 
      </div>
      <div class="nav-link" @click="activeTabID = 1">
        <span class="nav-desc-conf-set__item">
          Inverters
          <div class="line-black" v-if="activeTabID == 1"></div>
        </span>
      </div>
      <div class="nav-link" @click="activeTabID = 2">
        <span class="nav-desc-conf-set__item">
          Panels
          <div class="line-black" v-if="activeTabID == 2"></div>
        </span>  
      </div>
      <div class="nav-link" @click="activeTabID = 3">
        <span class="nav-desc-conf-set__item">
          Accesories
          <div class="line-black" v-if="activeTabID == 3"></div>
        </span>  
      </div>
    </div>

    <div class="long-details" v-if="activeTabID == 0">
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
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div class="loader"></div>
    </content-loader>
    </div>
    <div class="" v-if="activeTabID == 0">
    <div class="pagination-container" v-if="fetchedProducts">
      <span class="pagination"><p>Previous Page</p></span>
      <span class="pagination"><p>1 2 3 ... 5</p></span>
      <span class="pagination"><p>Next Page</p></span>
    </div>
    </div>
    <div class="long-details" v-if="activeTabID == 1">
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
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div class="loader"></div>
    </content-loader>
    </div>
    <div class="" v-if="activeTabID == 1">
    <div class="pagination-container" v-if="fetchedProducts">
      <span class="pagination"><p>Previous Page</p></span>
      <span class="pagination"><p>1 2 3 ... 5</p></span>
      <span class="pagination"><p>Next Page</p></span>
    </div>
    </div>
    <div class="long-details" v-if="activeTabID == 2">
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
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div class="loader"></div>
    </content-loader>
    </div>
    <div class="" v-if="activeTabID == 2">
    <div class="pagination-container" v-if="fetchedProducts">
      <span class="pagination"><p>Previous Page</p></span>
      <span class="pagination"><p>1 2 3 ... 5</p></span>
      <span class="pagination"><p>Next Page</p></span>
    </div>
    </div>
    <div class="long-details" v-if="activeTabID == 3">
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
          </div>
        </div>
      </div>
    <content-loader v-else>
      <span><div class="loader"></div></span>
    </content-loader>
    </div>
    <div class="" v-if="activeTabID == 3">
    <div class="pagination-container" v-if="fetchedProducts">
      <span class="pagination"><p>Previous Page</p></span>
      <span class="pagination"><p>1 2 3 ... 5</p></span>
      <span class="pagination"><p>Next Page</p></span>
    </div>
    </div>
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
      fetchedProducts: false,
      activeTabID: 0,
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
  .nav-desc-conf-set{
    display: flex;
    margin-top: 40px;
    font-size: 19px;
    align-items: center;
    justify-content: center;
    font-weight: normal;

    .nav-link{
      margin: 26px;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .nav-desc-conf-set__item{
      display: inline-block;
      font-size: 19px;
      color: #1d1d1d;
    }
    .nav-desc-conf-set__item:hover{
      cursor: pointer;
    }
    .line-black{
      border-bottom: solid 1px #000000;
      margin-top: 2px;
    }
  }

  .products-container {
    border-bottom: none;
    border-right: none;
    width: 100%;

    .product-item{
      cursor: pointer;
      border-right: 1px solid #000000;
      width: 24.9%;
      border-bottom: 1px solid #000000;

      .centered-content{
        width: 80%;
      }
    }
  }
  
  .pagination-container {
    border: 1px solid #000000;
    border-top: none;
    padding: 1% 0%;

    span{
      display: inline-block;
      padding: 0% 12%;
    }

    .pagination {
      font-size: 18px;
      color: #1d1d1d;

      p:hover {
        cursor: pointer;
      }
    }
  }
  
  .loader {
    display: flex;
    border: 6px solid #f3f3f3;
    border-top: 6px groove #414b55;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0% auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
</style>
