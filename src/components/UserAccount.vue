<template>
  <div id="user-account">
    <div class="header-text-28">My Account</div>
    <button class="button-logout small-text" @click="logout()">Logout</button>
    <div id="account-section">
      <div class="header-text-28">Account Details</div>
      <span><router-link to="/edit-my-account" class="header-text-28 text-edit">Edit</router-link></span>
      <div class="details-container">
        <div class="box">
          <div class="small-header-text">Personal details</div>
          <div class="info-text info-text-name">
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
      <div class="header-text-28">
        Order History
        <span>
          <router-link to="/order-history" class="header-text-28 text-edit btn-view-all">
            View All
          </router-link>
        </span>
      </div>
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
      <span class="header-text-28">Power As A Service</span>
      <div class="paas-active-plan-container">You have no active power as a service plan</div>
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


  .products-container{
    margin-bottom: 10%;
  }



  .button-logout{
    width: 100px;
    margin: 16px auto;
    background: transparent;
    border: none;
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

#account-section{
  .header-text-28{
    // width: 178px;
    text-align: left;
    height: 24px;
    font-size: 24px;
    font-weight: normal;
    margin-top: 60px;
    margin-bottom: 18px;
  }
  .text-edit{
    // width: 30px;
    height: 16px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  } 
  .details-container{
    margin-bottom: 10%;
    width: 99.9%;
  }
  .box{
    width: 50%;
  }
  .details-container :last-child{
    border-right: none;
  }
  .small-header-text{
    // width: 168px;
    height: 22px;
    font-size: 22px;
  }
  .info-text-name{
    font-weight: 500;
  }
  .btn-view-all{
    float: right;
    margin: 0 0;
  }
  .small-gray-text{
    // width: 143px;
    height: 14px;
    font-family: Graphik;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.34px;
    color: #414b55;
    margin-top: 12px;
  }
  .button-view-order{
    // width: 73px;
    // height: 14px;
    font-family: Graphik;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    width: 100%;
    margin-top: 25px;
    background: none;
    padding: 12px 0;
    transition: 0.5s ease-in-out;
    outline: none;
  }

  .button-view-order:hover{
    background: #1d1d1d;
    color: white;
    transition: 0.5s ease-in-out;
  }
  .paas-active-plan-container{
    // width: 459px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    height: 27px;
    font-family: Graphik;
    font-size: 18px;
    border: solid 1px #000000;
    margin: 4% 0;
    padding: 114px 0;
    text-align: center;
    color: #1d1d1d;
  }
}
  
</style>
