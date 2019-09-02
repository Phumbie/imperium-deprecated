<template>
  <div id="user-account">
    <div class="header-text-28">My Account</div>
    <button class="button-logout small-text" @click="logout()">Logout</button>
    <div class="section-title">Account Details</div>
    <span><router-link to="/edit-my-account" class="text-edit">Edit</router-link></span>
    <div class="details-container">
      <div class="box">
        <div class="small-header-text">Personal details</div>
        <div class="info-text">
          {{ userFullName }}
        </div>
        <div class="info-text">{{ userDetails.email }}</div>
        <div class="info-text">Non binary</div>
        <div class="info-text">
          {{ userDetails.phone_number }}
        </div>
      </div>
      <div class="box">
        <div class="small-header-text">Address</div>
        <div class="info-text">Sterling Towers, 20 Marina Road,</div>
        <div class="info-text">Lagos-Island,</div>
        <div class="info-text">100201</div>
      </div>
    </div>
    <span class="section-title">
      Order History
      <span class="view-all-title">
        <router-link to="/order-history" class="text-edit">
          View All
        </router-link>
      </span>
    </span>
    <div class="products-container">
      <div class="product-item" v-for="(n, index) in 4" :key="index">
        <div class="centered-content">
          <div class="image-container">
            <img src="../assets/images/battery.jpg">
          </div>
          <div class="small-text-18">10kWh Battery</div>
          <div class="small-gray-text">Order no: 00990987</div>
          <div class="small-gray-text">Status: Delivered</div>
          <router-link to="/order-history" tag="button" class="button-view-order">View Order</router-link>
        </div>
      </div>
    </div>
    <span class="section-title">Power As A Service</span>
    <div class="paas-active-plan-container">You have no active power as a service plan</div>
    
    <span class="section-title">Help & Support</span>
    <div class="help-box-container">
      <span class="help-box">
        <div class="small-header-text">Shop</div>
        <div class="info-text">Returns</div>
        <div class="info-text">Payment</div>
        <div class="info-text">Delivery</div>
      </span>
      <div class="help-box">
        <div class="small-header-text">Power As A Service</div>
        <div class="info-text">Calculator</div>
        <div class="info-text">Plans</div>
        <div class="info-text">Outright Purchase</div>
        <div class="info-text">Lease to Own</div>
      </div>
      <div class="help-box">
        <div class="small-header-text">AltPay</div>
        <div class="info-text">Terms & Conditions</div>
      </div>
      <span class="help-box">
        <p class="small-header-text">Can't find what you're looking for?</p>
        <router-link to="#" tag="button" class="button-send-mail">Send us an email</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userDetails: "",
      userFullName: "",
    }
  },
  mounted(){
    if(!localStorage.getItem("user_details")) {
      this.navigateTo("login");
      return;
    }

    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.userFullName = `${this.userDetails.first_name} ${this.userDetails.last_name}`
  },
  methods: {
    logout(){
      localStorage.clear();
      this.navigateTo('login');
    },
    navigateTo(page) {
      this.$router.push(page); 
    },
  }
}
</script>

<style lang="scss" scoped>
#user-account{
  a{
    text-decoration: none;
    width: auto !important;
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
  .view-all-title{
    float: right;
  }

  .text-edit{
    font-size: 15px;
    color: #000000;
    text-decoration: none;
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

  .products-container{
    margin-bottom: 50px;
  }

  .details-container{
    margin-bottom: 50px;
    width: 99.9%;
  }

  .paas-active-plan-container{
    border: solid 1px #000000;
    margin: 2% 0% 2% 0%;
    padding-top: 114px;
    padding-bottom: 114px;
    text-align: center;
    color: #1d1d1d;
  }

  .button-logout{
    width: 100px;
    // margin: 0 auto;
    background: transparent;
    border: none;
  }

  .box{
    width: 50%;
  }
  .details-container :last-child{
    border-right: none;
  }
  .help-box-container{
    margin-top: 29px;
    width: 100%;
    border: solid 1px #000000;
    display: flex;

    .border-right-none{
      border-right: none !important;
    }

    .help-box{
      width: 20%;
      padding-top: 30px;
      padding-left: 20px;
      padding-bottom: 20px;
      padding-right: 0px;

      .small-header-text{
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 25px;
      }

      .info-text{
        font-size: 12px;
        margin-bottom: 20px;
        font-weight: 500;
        color: #414b55;
      }
    }
  }
  .help-box-container span:last-child{
    width: 60%;
    border-right: none;
    border-left: solid 1px black;
    text-align: center;
  }
  .help-box-container span:first-child{
    width: 13%;
  }
  .button-send-mail{
    width: 50%;
    // margin-top: 25px;
    font-size: 14px;
    background: none;
    padding-top: 12px;
    padding-bottom: 12px;
    transition: 0.5s ease-in-out;
    outline: none;
  }
  .button-send-mail:hover{
    background: black;
    color: white;
    transition: 0.5s ease-in-out;
  }
  .help-box p:first-child{
    margin-top: 7%;
  }
}
</style>
