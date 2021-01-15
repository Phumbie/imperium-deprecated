<template>
  <div id="checkout-page">
    <div class="left-side">
      <div class="header-text-28">Shipping details</div>
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
      <button @click="placeOrder()">Outright payment</button>
      <button @click="payWithSpecta()">
        Lease to own<span class="loader" v-if="loading"></span>
      </button>
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
        <div class="details">
          <div class="product-name capitalize">
            {{ orderItems[index].name }}
          </div>
          <div class="price">
            ₦ {{ orderItems[index].price.toLocaleString() }}
          </div>
          <div class="quantity">{{ orderItems[index].quantity }}</div>
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
import { mapActions } from "vuex";
import api from "@/utils/api.js";
import TopNav from "@/components/TopNav";
export default {
  components: {
    TopNav,
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
      phone_number: JSON.parse(localStorage.getItem("user_order"))
        .contact_phone,
      store: this.$store,
      loading: false,
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
    this.fullName = `${this.user.customer.first_name} ${this.user.customer.last_name}`;
    // this.phone_number = `${this.user.user.phone_number}`;
  },
  methods: {
    ...mapActions("notificationModule", ["showToast"]),
    navigateTo(page) {
      this.$router.push(page);
    },
    getNewlyCreatedOrder() {
      return JSON.parse(localStorage.getItem("user_order"));
    },
    payWithSpecta() {
      this.loading = true;
      const items = this.orderItems.map((item) => {
        return item.name;
      });
      const data = {
        reference: this.getRandomString(10) + this.order.id,
        description: `Purchase of ${items}`,
        amount: Math.ceil(this.totalCost),
      };
      api
        .spectaPaymentUrl(data)
        .then(({ data }) => {
          window.location = data.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    placeOrder() {
      let x = this;
      const handler = PaystackPop.setup({
        key: process.env.VUE_APP_PS_KEY,
        email: x.user.user.email,
        amount: Math.ceil(this.totalCost * 100),
        currency: "NGN",
        metadata: {
          custom_fields: {
            order_id: this.order.id,
          },
        },
        callback: function(response) {
          x.showToast({
            description: "Your order is being processed",
            display: true,
            type: "success",
          });
          x.navigateTo("/products");
        },
      });
      handler.openIframe();
    },
    getRandomString(length) {
      let randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/checkout.scss";
.loader {
  display: flex;
  border: 1px solid #000000;
  border-top: 1px groove #ffffff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-left: 0.5rem;
  animation: spin 1s linear infinite;
}
</style>
