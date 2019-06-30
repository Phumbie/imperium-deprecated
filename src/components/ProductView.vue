<template>
  <div id="product-view">
    <div class="product" v-if="fetchedProductDetails">
      <div class="image-container">
        <!-- <img src="../assets/images/battery.jpg"> -->
        <img :src="productDetails.display_image">
      </div>
      <div class="product-details">
        <div class="centered-content">
          <div class="product-name">
            {{ productDetails.name }}
          </div>
          <div class="price">
            ₦ {{ (productDetails.price/100).toLocaleString() }}
          </div>
          <div 
            class="btn-add-to-cart" 
            @click="addProductToCart()"
          >
            Add to cart
          </div>
          <div class="desc-conf-set">
            <span class="align-left">Description</span>
            <span class="align-right">Setup</span>
            <span class="align-right">Configurations</span>
          </div>
          <div class="long-details">
            {{ productDetails.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="header-text-28">Similar Products</div>
    <div class="products-container">
      <div class="product-item" v-for="(n, index) in 4" :key="index">
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
import api from "@/utils/api.js";

export default {
  name: 'ProductView',
  data () {
    return {
      productSlug: this.$route.params.slug,
      productId: this.$route.params.id,
      productDetails: [],
      fetchedProductDetails: false
    }
  },
  mounted() {
    this.getProductDetails();
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page); 
    },
    getProductDetails(){
      api
        .getProductBySlug(this.productSlug)
        .then(({ data }) => {
          this.productDetails = data.data;
          this.fetchedProductDetails = true;
          console.log(data);
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(response.data.message);
        });
    },
    addProductToCart(){
      if(!localStorage.getItem("user_details")) {
        alert("You have to login or signup to add product to cart 🙃");
        this.navigateTo("/login");
        return;
      }

      api
        .addProductToCart(this.productId)
        .then(({ data }) => {
          this.$store.dispatch('incrementCartCounter');
          alert("Successfully added product to cart!");
        })
        .catch(({ response }) => {
          alert("Sorry boo, an error occured while adding to cart");
        });
    }
  }
}
</script>

<style lang="scss" scoped>
#product-view{
  padding-top: 74px;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;

  .product{
    display: flex;
    flex-direction: row;

    .image-container{
      width: 50%;
      background: transparent !important;
      display: flex;
      align-items: center;
      justify-content: center;
      border: solid 1px #000000;
      border-right: none;

      img{
        object-fit: cover;
        width: 80%;
        height: 80%;
      }
    }

    .product-details{
      width: 50%;
      border: solid 1px #000000;

      .centered-content{
        width: 70%;
        margin: 0 auto;
        padding-top: 50px;
        padding-bottom: 130px;

        .long-details{
          line-height: 1.44;
          color: #000000;
          font-size: 18px;
        }

        .product-name{
          font-size: 32px;
          margin-bottom: 18px;
          text-transform: capitalize;
        }

        .price{
          font-size: 24px;
        }

        .btn-add-to-cart{
          width: 100%;
          padding-top: 15px;
          padding-bottom: 15px;
          border: solid 1px #000000;
          text-align: center;
          font-size: 24px;
          margin-top: 45px;
          cursor: pointer;
          transition: 0.5s;
        }
        .btn-add-to-cart:hover{
          background: #000000;
          color: white;
          transition: 0.5s;
        }
      }
    }
  }

  .header-text-28{
    margin-top: 62px;
    margin-bottom: 10px;
  }

  .product-item{
    .centered-content{
      width: 70%;
    }
  }

  .desc-conf-set{
    margin-top: 40px;
    width: 100%;
    font-size: 18px;
    float: left;
    margin-bottom: 27px;

    .align-left{
      float: left;
      width: 50%;
    }

    .align-right{
      float: right;
      width: 20%;
      text-align: right;
    }
  }
}
</style>
