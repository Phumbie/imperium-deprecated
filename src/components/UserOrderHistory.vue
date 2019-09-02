<template>
  <div id="user-order-history">
    <div class="header-text-28">Order Details</div>
    <!-- <div class="small-text">Thank you for your order. Check your details below.</div> -->
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
    <span class="section-title">Items</span>
    <div class="products-container">
      <div class="product-item" v-for="(n, index) in 4" :key="index">
        <div class="centered-content">
          <div class="image-container">
            <img src="../assets/images/battery.jpg">
          </div>
          <div class="small-text-18">10kWh Battery</div>
          <div class="small-gray-text">NGN 200,000.00</div>
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
  .section-title{
    margin-top: 60px;
    font-size: 19px;
    margin-bottom: 18px;
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
  .box{
    width: 50%;
  }
}
</style>
