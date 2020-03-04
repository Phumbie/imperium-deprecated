<template>
  <div id="checkout-page">
    <div class="left-side">
      <div class="sub-header">Shipping details</div>
      <input
        type="text"
        placeholder="Full name"
        :value="this.fullName"
        class="text-field capitalize"
      />
      <input
        type="text"
        placeholder="Phone number"
        :value="this.phone_number"
        class="text-field"
      />
      <input
        type="text"
        placeholder="Address"
        :value="this.address"
        class="text-field capitalize"
      />
      <button @click="placeOrder()">Place order</button>
    </div>
    <div class="right-side">
      <div
        class="cart-item"
        v-for="(product, index) in orderItems.length"
        :key="index"
      >
        <div class="image-container">
          <img :src="orderItems[index].display_image" />
        </div>
        <div>
          <div class="item-name capitalize">{{ orderItems[index].name }}</div>
          <div class="item-name">
            ₦{{ orderItems[index].price.toLocaleString() }}
          </div>
          <div class="item-name">{{ orderItems[index].quantity }}</div>
        </div>
      </div>
      <div class="text-row">
        <span class="left-text">Subtotal</span>
        <span class="right-text">₦ {{ subtotal.toLocaleString() }}</span>
      </div>
      <div class="text-row">
        <span class="left-text">Delivery</span>
        <span class="right-text">₦ {{ deliveryCost.toLocaleString() }}</span>
      </div>
      <div class="text-row">
        <span class="left-text">Total</span>
        <span class="right-text">₦ {{ totalCost.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
import TopNav from "@/components/TopNav";

export default {
  components: {
    TopNav
  },
  data() {
    return {
      order: {},
      orderItems: [],
      subtotal: 0,
      totalCost: 0,
      deliveryCost: 0,
      address: "",
      user: "",
      fullName: "",
      phone_number: JSON.parse(localStorage.getItem("user_order")).contact_phone
    };
  },
  mounted() {
    this.order = this.getNewlyCreatedOrder();
    this.totalCost = this.order.total_price;
    this.subtotal = this.order.sub_total;
    this.deliveryCost = this.order.delivery_cost;
    this.orderItems = this.order.items;
    this.user = JSON.parse(localStorage.getItem("user_details"));
    this.address = `${this.order.shipping_address.street}, ${this.order.shipping_address.lga}, ${this.order.shipping_address.state}`;
    this.fullName = `${this.user.first_name} ${this.user.last_name}`;
    // this.phone_number = `${this.user.user.phone_number}`;
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    getNewlyCreatedOrder() {
      return JSON.parse(localStorage.getItem("user_order"));
    },
    placeOrder() {
      const order = this.getNewlyCreatedOrder();
      const handler = PaystackPop.setup({
        // key: "pk_test_8d401b3f50e9dd566c8273a1ebc1524a2d34d3f4",
        key: "pk_test_a5e5a7ad89b8d468a6482b29dcf2acd7b09a1c18",
        email: "test@gmail.com",
        amount: Math.ceil(this.totalCost * 100),
        currency: "NGN",
        metadata: {
          custom_fields: {
            order_id: order.id
          }
        },
        callback: function(response) {
          this.$swal.fire({
            icon: "info",
            html:
              "Order is being processed, you'll get an email shortly on the order status"
          });
          this.navigateTo("/products");
        }
      });
      handler.openIframe();
    }
  }
};
</script>

<style lang="scss" scoped>
#checkout-page {
  width: 100%;
  margin: 0 auto;
  display: flex;

  .left-side {
    flex: 1;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: solid 1px #1d1d1d;
    padding: 5rem 1px;

    .sub-header {
      margin-top: 50px;
      margin-bottom: 20px;
      font-size: 1.8rem;
      letter-spacing: 0.05rem;
      text-align: start;
    }
  }

  .right-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8rem 0;
    width: 50%;

    .cart-item {
      width: 70%;
      display: flex;
      font-size: 1.2rem;
      margin-bottom: 5rem;

      .image-container {
        width: 150px;
        height: 150px;
        background: transparent;
        margin-right: 20px;

        img {
          object-fit: contain;
          width: 70%;
          height: 70%;
          padding: 1rem;
        }
      }

      span {
        margin-bottom: 20px;
        color: #1d1d1d;
      }

      .item-name {
        margin-top: 1rem;
        font-weight: 500;
        color: #1d1d1d;
      }
    }

    .text-row {
      width: 70%;
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      font-weight: 500;
      color: #1d1d1d;
      margin-bottom: 20px;
      border-bottom: 1px solid #1d1d1d;

      span {
        font-size: 17px;
      }

      span.right-text {
        float: right;
      }
    }
  }

  .header-text {
    font-size: 32px;
  }

  .text-field {
    width: 70%;
    padding: 15px 20px 15px 20px;
    box-sizing: border-box;
    font-size: 14px;
    outline: none;
    border: solid 1px #1d1d1d;
    margin-bottom: 30px;
  }

  select {
    width: 40%;
    outline: none;
    background: transparent;
    border: solid 1px rgba(0, 0, 0, 0.2);
    height: 40px;
    font-size: 14px;
    color: rgb(112, 112, 112);
  }

  .width-half {
    width: 48%;
  }

  .float-right {
    float: right;
  }

  button {
    display: block;
    width: 70%;
    padding-top: 20px;
    padding-bottom: 20px;
    background: black;
    color: white;
    font-size: 14px;
    margin-top: 20px;
    border: none;
    text-transform: uppercase;
  }
}

//mobile
@media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) {
  .container {
    margin: 0 5%;
  }

  #checkout-page {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .left-side {
      width: 100%;
      min-height: 60vh;
      border-right: none;
      border-bottom: solid #000000 1px;
      padding-top: 20px;
      padding-right: 0px;
    }

    .right-side {
      width: 100%;
      padding-top: 0px;
      padding-left: 0px;

      .cart-item {
        width: 100%;
        // float: left;
        font-size: 12px;
        margin-bottom: 5px;
        border-bottom: solid #000000 1px;

        .image-container {
          width: 150px;
          height: 150px;
          background: transparent;
          margin-right: 20px;
        }

        span {
          display: inline-block;
          margin-bottom: 10px;
          margin-left: 30px;
          color: rgba(0, 0, 0, 0.9);
        }

        span.item-name {
          margin-top: 50px;
          font-weight: 500;
        }
      }

      .divider {
        display: none;
      }

      .text-row {
        margin-bottom: 30px;

        span {
          font-size: 14px;
        }

        span.right-text {
          float: right;
        }
      }
    }

    .header-text {
      font-size: 32px;
    }

    .sub-header {
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .text-field {
      width: 100%;
      padding: 15px 20px 15px 20px;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 14px;
      outline: none;
      border: solid 1px rgba(0, 0, 0, 0.2);
      margin-bottom: 30px;
    }

    select {
      width: 40%;
      outline: none;
      background: transparent;
      border: solid 1px rgba(0, 0, 0, 0.2);
      height: 40px;
      font-size: 14px;
      color: rgb(112, 112, 112);
    }

    .width-half {
      width: 48%;
    }

    .float-right {
      float: right;
    }

    button {
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
}
</style>
