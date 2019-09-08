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
          <div class="">
            <div class="loan-calc-title">Loan Calculator</div>
            <div class="loan-calc-details">
              Loan Amount (+5% VAT and Service Fee)
              <span class="loan-calc-value">
                ₦ {{ (productDetails.price/100).toLocaleString() }}
              </span>
            </div>
            <div class="loan-calc-details">
              Deposit(Min 30%)
              <span class="loan-calc-value">
                ₦ {{ (productDetails.price/100).toLocaleString() }}
              </span>
            </div>
            <input type="range" min="1" max="100" value="0" class="slider" id="my-range">
            <div class="loan-calc-details">
              Duration
              <span class="loan-calc-value">12 Months</span>
            </div>
            <input type="range" min="1" max="100" value="0" class="slider" id="my-range">
            <div class="loan-calc-details monthly-payment">
              Monthly Repayment:
              <span class="loan-calc-value monthly-payment">
                ₦ {{ (productDetails.price/100).toLocaleString() }}
              </span>
            </div>
            <div 
            class="btn-add-to-cart" 
            @click="addProductToCart()"
          >
            Buy Now
          </div>
          </div>
        </div>
      </div>
    </div>
    <content-loader v-else>
      <span>Fetching products details...</span>
    </content-loader>
    <div class="nav-desc-conf-set">
      <div class="nav-desc" @click="activeTabID = 0">
        <span class="nav-desc-conf-set__item">
          Description
          <div class="line-black" v-if="activeTabID == 0"></div>
        </span> 
      </div>
      <div class="nav-conf" @click="activeTabID = 1">
        <span class="nav-desc-conf-set__item">
          Configurations
          <div class="line-black" v-if="activeTabID == 1"></div>
        </span>
      </div>
      <div class="nav-set" @click="activeTabID = 2">
        <span class="nav-desc-conf-set__item">
          Setup
          <div class="line-black" v-if="activeTabID == 2"></div>
        </span>  
      </div>
    </div>

    <div class="long-details" v-if="activeTabID == 0">
      {{ productDetails.description }}      
    </div>
    <div class="long-details" v-else-if="activeTabID == 1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis molestias 
      perferendis unde repudiandae cupiditate 
      sint neque odit dolorem ipsa omnis facilis 
      qui quos possimus saepe nihil aliquid, dicta quo deleniti.
    </div>
    <div class="long-details" v-else>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
      Quasi voluptas ad placeat fuga in corrupti veri
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
import contentLoader from "@/components/contentLoader"

export default {
  name: 'ProductView',
  components: {
    contentLoader
  },
  data () {
    return {
      productSlug: this.$route.params.slug,
      productId: this.$route.params.id,
      productDetails: [],
      fetchedProductDetails: false,
      activeTabID: 0,
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
        height: 90%;
      }
    }

    .product-details{
      width: 50%;
      border: solid 1px #000000;

      .centered-content{
        width: 70%;
        margin: 0 auto;
        padding-top: 5.1%;
        padding-bottom: 4.6%;

        .product-name{
          margin-bottom: 18px;
          text-transform: capitalize;
          // width: 346px;
          height: 36px;
          font-family: Graphik;
          font-size: 36px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #1d1d1d;
        }

        .price{
          // width: 159px;
          height: 31px;
          font-family: Helvetica;
          font-size: 26px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #1d1d1d;          
        }

        .btn-add-to-cart{
          width: 100%;
          height: 9.6%;
          padding-top: 15px;
          padding-bottom: 15px;
          border: solid 1px #000000;
          margin-top: 5.2%;
          margin-right: 5px;
          margin-left: 5px;
          cursor: pointer;
          transition: 0.5s;
          font-family: Graphik;
          font-size: 26px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          text-align: center;
          color: #1d1d1d;
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

  .nav-desc-conf-set{
    display: flex;
    margin-top: 40px;
    width: 100%;
    font-size: 19px;
    // float: left;
    margin-bottom: 27px;

    .nav-desc-conf-set__item{
      display: inline-block;
      margin-top: 20px;
      margin-right: 80px;

      // width: 103px;
      height: 23px;
      font-family: Graphik;
      font-size: 19px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #1d1d1d;
    }
    .nav-desc-conf-set__item:hover{
      cursor: pointer;
    }
    .line-black{
      border-bottom: solid 1px #000000;
      margin-top: 7px;
    }
  }
  .long-details{
    width: 62%;
    // height: 253px;
    font-family: Graphik;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.44;
    letter-spacing: normal;
    color: #000000;
  }
  .small-text-18{
    // width: 127px;
    height: 18px;
    padding: 2%;
    font-family: Graphik;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.43px;
    color: #414b55;
  }
  .text-blue{
    // width: 145px;
    height: 18px;
    padding: 2%;
    font-family: Graphik;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.43px;
    // text-align: center;
    color: #4a90e2;
  }
  
  .loan-calc-title{
    margin-top: 6%;
    // width: 189px;
    height: 29px;
    font-family: Graphik;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.58px;
    color: #000000;
  }
  .loan-calc-details{
    margin-top: 4.7%;
    color: #7F7F7F;
    width: 100%;
    // height: 22px;
    font-family: Helvetica;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.43px;  
  }
  .loan-calc-details span{
    float: right;
  }
  .loan-calc-value{
    color: #000000;
  }
  .monthly-payment{
    width: 100%;
    height: 29px;
    font-family: Graphik;
    font-size: 24px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.58px;
    text-align: center;
    // color: rgba(0, 0, 0, 0.5);

  }
  .monthly-payment span{
    float: none;
    font-weight: 500;
  }
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 3px;  
    background: #bfbdbd;
    cursor: pointer;
    outline: none;
    opacity: 0.33;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }
  .slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%; 
  box-shadow: 0 2px 4px 0 rgba(120, 120, 120, 0.5);
  background: #fffcfc;
  cursor: pointer;
  }
  .slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(120, 120, 120, 0.5);
  background: #fffcfc;
  cursor: pointer;
}
}
</style>
