<template>
  <div id="user-account">
    <div class="header-text-28">My Account</div>
    <button class="button-logout small-text" @click="logout()">Logout</button>
    <div class="section-title">Account Details</div>
    <span>
      <router-link 
        to="my-account/update" 
        class="header-text-28 text-edit"
      >
        Edit
      </router-link>
    </span>
    <div class="details-container">
      <div class="box">
        <div class="small-header-text">Personal details</div>
        <div class="info-text">
          {{ userFullName }}
        </div>
        <div class="info-text">{{ userDetails.user.email }}</div>
        <div class="info-text">Non binary</div>
        <div class="info-text">
          {{ userDetails.user.phone_number }}
        </div>
      </div>
      <div class="box">
        <div class="small-header-text">Address</div>
        <div class="info-text">{{ userDetails.address.street }},</div>
        <div class="info-text">{{ userDetails.address.lga }},</div>
        <div class="info-text">{{ userDetails.address.state }}.</div>
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
          <router-link 
            to="my-account/order-history" 
            tag="button" 
            class="button-view-order"
          >
            View Order
          </router-link>
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
    // console.log(this.userDetails)
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

    &:hover {
      background: black;
      color: white;
      transition: 0.5s ease-in-out;
    }
  }


  .products-container, 
  .details-container{
    margin-bottom: 50px;
  }

  .paas-active-plan-container{
    border: solid 1px #000000;
    padding-top: 114px;
    padding-bottom: 114px;
    text-align: center;
    color: #1d1d1d;
  }

  .button-logout{
    width: 100px;
    background: transparent;
    border: none;
  }
}
</style>
