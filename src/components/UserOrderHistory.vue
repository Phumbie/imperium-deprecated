<template>
  <div id="user-order-history" v-if="loading">
    <div class="header-text-28">Order Details</div>
    <!-- <div class="small-text">Thank you for your order. Check your details below.</div> -->
    <div class="details-container">
      <div class="box">
        <div class="small-header-text">Order Sent</div>
        <div class="info-text capitalize">{{ this.userFullName }}</div>
        <div class="info-text">{{ this.userDetails.user.email }}</div>
        <div class="info-text">{{ this.date[0] }}</div>
        <div class="info-text capitalize">{{ `${this.userDetails.address.street}, ${this.userDetails.address.lga}, ${this.userDetails.address.state}.` }}</div>
      </div>
      <div class="box border-right-none">
        <div class="small-header-text">Order Total</div>
        <div class="amount-row">
          <span class="info-text">Sub-Total:</span>
          <span class="info-text float-right">₦ {{ (this.placedOrder.sub_total/100).toLocaleString() }}</span>
        </div>
        <div class="amount-row">
          <span class="info-text">Delivery:</span>
          <span class="info-text float-right">₦ {{ (this.placedOrder.delivery_cost/100).toLocaleString() }}</span>
        </div>
        <div class="amount-row">
          <span class="info-text">Total:</span>
          <span class="info-text float-right">₦ {{ (this.placedOrder.total_price/100).toLocaleString() }}</span>
        </div>
      </div>
    </div>
    <span class="section-title">Items</span>
    <div class="products-container">
      <div class="product-item" v-for="(item, index) in orderItems" :key="index">
        <div class="centered-content">
          <div class="image-container">
            <img :src="`${ item.display_image }`">
          </div>
          <div class="small-text-18">{{ item.name }}</div>
          <div class="small-gray-text"> {{ `Price: ₦ ${(item.price/100).toLocaleString()}` }}</div>
          <div class="small-gray-text">{{ `Quantity: ${item.quantity}` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      userDetails: "",
      userFullName: "",
      placedOrder: [],
      orderItems: [],
      date: ""
    }
  },
  mounted(){
    if(!localStorage.getItem("user_details")) {
      this.navigateTo("login");
      return;
    }
    this.placedOrder = JSON.parse(localStorage.getItem('placed_order'));
    this.orderItems = JSON.parse(localStorage.getItem('placed_items'));
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.date = (this.placedOrder.paid_at).split("T")
    this.userFullName = `${this.userDetails.first_name} ${this.userDetails.last_name}`
    this.loading = true
  },

  methods: {
    goTo(page) {
      this.$router.push(page); 
    },
  }
}
</script>

<style lang="scss" scoped>
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

  .details-container {
    .box {
      width: 50%;
    }
  }
}
</style>