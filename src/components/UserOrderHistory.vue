<template>
  <div id="user-order-history">
    <div class="header-text-28">Order Details</div>
    <div class="small-text">Thank you for your order. Check your details below.</div>
    <div class="details-container">
      <div class="box">
        <div class="small-header-text">Order Sent</div>
        <div class="info-text">Bruno Pluto</div>
        <div class="info-text">earthyjupiter@moon.com</div>
        <div class="info-text">Gender binary</div>
        <div class="info-text">+2349071657890</div>
      </div>
      <div class="box border-right-none">
        <div class="small-header-text">Order Total</div>
        <div class="amount-row">
          <span class="info-text">Sub-Total:</span>
          <span class="info-text float-right">NGN700,000.00</span>
        </div>
        <div class="amount-row">
          <span class="info-text">Delivery:</span>
          <span class="info-text float-right">NGN2,000.00</span>
        </div>
        <div class="amount-row">
          <span class="info-text">Total:</span>
          <span class="info-text float-right">NGN702,000.00</span>
        </div>
      </div>
    </div>
    <div class="products-container">
      <div class="small-header-text">Items</div>
      <div class="text-item">4 Items</div>
      <div class="product-item" v-for="(n, index) in 4" :key="index">
        <div class="centered-content">
          <div class="image-container">
            <img src="../assets/images/battery.jpg">
          </div>
          <div class="small-text-18">10kWh Battery</div>
          <div class="small-text-18">NGN 200,000.00</div>
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
// #user-order-history{
//   .section-title{
//     margin-top: 60px;
//     font-size: 19px;
//     margin-bottom: 18px;
//   }

//   .small-gray-text{
//     font-size: 15px;
//     margin-top: 12px;
//   }

//   .float-right{
//     float: right;
//   }
  
//   .amount-row{
//     margin-bottom: 30px;
//   }
// }
#user-order-history{
  .header-text-28{
  // width: 228px;
  margin-top: 7%;
  }
  .small-text{
    margin: 2% auto;
    width: 582px;
    height: 24px;
    margin-bottom: 10%;
    font-size: 24px;
  }
  .details-container{
    width: 99.9%;
    .small-header-text{
      // width: 168px;
      height: 22px;
      font-size: 22px;
    }
  }
  .box{
    width: 50%;
  }
  .details-container :last-child{
    border-right: none;
  }
  .products-container{
    border-top: none;
    margin-top: 0%;
    .product-item{
      border:none;
    }
    .header-text-28{
      text-align: left;
      // width: 134px;
      height: 25px;
      font-size: 24px;
    }
    .small-header-text{
      margin-top: 4.7%;
      margin-left: 4%;
      margin-bottom: 0%;
      // width: 134px;
      height: 25px;
      font-size: 24px;
    }
    .text-item{
      height: 16px;
      font-size: 16px;
      margin-left: 4%;
      margin-top: 1%;
    }
    .small-text-18{
      // width: 127px;
      margin-top: 2%;
      margin-bottom: 5%;
      font-weight: normal;
    }
  }


  .small-gray-text{
    font-size: 15px;
    margin-top: 12px;
  }

  .float-right{
    float: right;
  }
  
  .amount-row{
    margin-bottom: 30px;
  }
}
</style>
