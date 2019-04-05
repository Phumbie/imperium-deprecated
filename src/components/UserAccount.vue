<template>
  <div id="user-account">
    <div class="header-text-28">My Account</div>
    <div class="small-text">Logout</div>
    <div class="section-title">Account Details</div>
    <span class="text-edit">Edit</span>
    <div class="details-container">
      <div class="box">
        <div class="small-header-text">Personal details</div>
        <div class="info-text">Bruno Pluto</div>
        <div class="info-text">earthyjupiter@moon.com</div>
        <div class="info-text">Gender binary</div>
        <div class="info-text">+2349071657890</div>
      </div>
      <div class="box">
        <div class="small-header-text">Payment Details</div>
        <div class="info-text">Mastercard</div>
        <div class="info-text">5622 6799 1987 ****</div>
        <div class="info-text">Bruno Pluto</div>
      </div>
      <div class="box">
        <div class="small-header-text">Address</div>
        <div class="info-text">Sterling Towers, 20 Marina Road,</div>
        <div class="info-text">Lagos-Island,</div>
        <div class="info-text">100201</div>
      </div>
    </div>
    <span class="section-title">Order History</span>
    <div class="products-container">
      <div class="product-item" v-for="(n, index) in 4" :key="index">
        <div class="centered-content">
          <div class="image-container">
            <img src="../assets/images/battery.jpg">
          </div>
          <div class="small-text-18">10kWh Battery</div>
          <div class="small-gray-text">Order no: 00990987</div>
          <div class="small-gray-text">Status: Delivered</div>
          <button class="button-view-order">View Order</button>
        </div>
      </div>
    </div>
    <span class="section-title">Power As A Service</span>
    <div class="paas-active-plan-container">You have no active power as a service plan</div>
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
#user-account{
  .small-text{
    cursor: pointer;
  }

  .small-text-18{
    margin-bottom: 18px;
  }

  .small-gray-text{
    font-size: 15px;
    margin-top: 12px;
  }

  .section-title{
    margin-top: 60px;
    font-size: 19px;
    margin-bottom: 18px;
  }

  .text-edit{
    font-size: 15px;
    cursor: pointer;
  }

  .button-view-order{
    width: 100%;
    margin-top: 25px;
    font-size: 14px;
    background: none;
    padding-top: 12px;
    padding-bottom: 12px;
    transition: 0.5s ease-in-out;
    outline: none;
  }

  .button-view-order:hover{
    background: black;
    color: white;
    transition: 0.5s ease-in-out;
  }

  .products-container, .details-container{
    margin-bottom: 50px;
  }

  .details-container{
    margin-top: 29px;
    width: 100%;
    border: solid 1px #000000;
    display: flex;

    .box{
      width: 33.1%;
      border-right: solid 1px black;
      padding-top: 30px;
      padding-left: 38px;
      padding-bottom: 20px;

      .small-header-text{
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 25px;
      }

      .info-text{
        font-size: 16px;
        margin-bottom: 20px;
        font-size: 15px;
      }
    }
  }

  .paas-active-plan-container{
    border: solid 1px #000000;
    padding-top: 114px;
    padding-bottom: 114px;
    text-align: center;
    color: #1d1d1d;
  }

}
</style>
