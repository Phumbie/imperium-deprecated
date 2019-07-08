<template>
  <div id="checkout-page">
    <div class="left-side">
      <div class="header-text">Alt Power</div>
      <div class="sub-header">Shipping address</div>
      <input type="text" placeholder="Full name" class="text-field">
      <input type="text" placeholder="Phone number" class="text-field">
      <input type="text" placeholder="Address" class="text-field">
      <select class="width-half">
        <option value="" selected disabled>State</option>
        <option value="lagos">Lagos</option>
        <option value="abuja">Abuja</option>
      </select>
      <select class="width-half float-right">
        <option value="" selected disabled>City</option>
        <option value="">Ikeja</option>
        <option value="">Victoria Island</option>
      </select>
      <div class="sub-header">Payment info</div>
      <input type="text" placeholder="Card number" class="text-field">
      <input type="text" placeholder="05 / 22" class="text-field width-half">
      <input type="text" placeholder="CVV" class="text-field width-half float-right">
      <button @click="placeOrder()">Place order</button>
    </div>
    <div class="right-side">
      <div
        class="cart-item" 
        v-for="(product, index) in orderItems.length"
        :key="index">
        <div class="image-container">
          <img :src="orderItems[index].display_image">
        </div>
        <span class="item-name">
          {{ orderItems[index].name }}
        </span>
        <br>
        <span class="price">
          ₦ {{ (orderItems[index].price/100).toLocaleString() }}
        </span>
        <br>
        <span class="quantity">
          {{ orderItems[index].quantity }}
        </span>
      </div>
      <div class="divider"></div>
      <div class="text-row">
        <span class="left-text">Subtotal</span>
        <span class="right-text">
          ₦ {{ subtotal.toLocaleString() }}
        </span>
      </div>
      <div class="text-row">
        <span class="left-text">Delivery</span>
        <span class="right-text">
          ₦ {{ deliveryCost.toLocaleString() }}
        </span>
      </div>
      <div class="text-row">
        <span class="left-text">Total</span>
        <span class="right-text">
          ₦ {{ totalCost.toLocaleString() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
import TopNav from '@/components/TopNav'

export default {
  components: {
    TopNav
  },
  data () {
    return {
      order : {},
      orderItems: [],
      subtotal: 0,
      totalCost: 0,
      deliveryCost: 0,
    }
  },
  mounted() {
    this.order = this.getNewlyCreatedOrder();
    this.totalCost = this.order.total_price/100;
    this.subtotal = this.order.sub_total/100;
    this.deliveryCost = this.order.delivery_cost/100;
    this.orderItems = this.order.items;
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    getNewlyCreatedOrder() {
      return JSON.parse(localStorage.getItem('user_order'));
    },
    placeOrder() {
      const handler = PaystackPop.setup({
        key: "pk_test_81acab8a6b2d493b0e65cee63c8bee581c874aa1",
        email: "test@gmail.com",
        amount: this.totalCost * 100,
        currency: "NGN",
        metadata: {
          
        },
        callback: function(response) {
          alert(
            "Order is being processed, you'll get an email shortly on the order status"
          );
          this.navigateTo("/product-catalogue");
        }
      });
      handler.openIframe();
    },
  }
}
</script>

<style lang="scss" scoped>
#checkout-page{
  width: 70%;
  margin: 0 auto;
  display: flex;

  .left-side{
    width: 50%;
    min-height: 100vh;
    float: left;
    border-right: solid 1px rgba(128, 128, 128, 0.404);
    padding-top: 50px;
    padding-right: 100px;
  }

  .right-side{
    padding-top: 100px;
    padding-left: 80px;
    width: 50%;
    float: left;

    .cart-item{
      width: 100%;
      float: left;
      display: block;
      font-size: 17px;
      margin-bottom: 50px;

      .image-container{
        width: 150px;
        height: 150px;
        background: gray;
        float: left;
        margin-right: 20px;
      }

      span{
        display: inline-block;
        margin-bottom: 20px;
        color: rgba(0, 0, 0, 0.9);
      }

      span.item-name{
        margin-top: 20px;
        font-weight: 500;
      }
    }

     .divider{
       width: 100%;
       height: 1px;
       background: rgb(218, 218, 218);
       float: left;
       display: block;
       margin-bottom: 30px;
    }

    .text-row{
      margin-bottom: 20px;

      span{
        font-size: 17px;
      }

      span.right-text{
        float: right;
      }
    }
  }

  .header-text{
    font-size: 32px;
  }

  .sub-header{
    font-size: 20px;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .text-field{
    width: 100%;
    padding: 15px 20px 15px 20px;
    border-radius: 5px;
    box-sizing:border-box;
    font-size: 14px;
    outline: none;
    border: solid 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
  }

  select{
    width: 40%;
    outline: none;
    background: transparent;
    border: solid 1px rgba(0, 0, 0, 0.2);
    height: 40px;
    font-size: 14px;
    color: rgb(112, 112, 112);
  }

  .width-half{
    width: 48%;
  }

  .float-right{
    float: right;
  }

  button{
    display: block;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    background: black;
    color: white;
    font-size: 14px;
    margin-top: 20px;
    border-radius: 5px;
    text-transform: uppercase;
  }

}
</style>