<template>
  <div>
    <div id="checkout-page" class="container" v-if="loading">
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
        <button @click="placeOrder()">Outright Payment</button>
        <button @click="payWithSpecta()">
          Lease To Own
        </button>
      </div>
      <div class="right-side">
        <div
          class="cart-item"
          v-for="(product, index) in orderItems"
          :key="index"
        >
          <div class="image-container">
            <img :src="product.display_image" />
          </div>
          <div class="details">
            <div class="product-name capitalize">
              {{ product.name }}
            </div>
            <div class="price">₦ {{ product.price.toLocaleString() }}</div>
            <div class="quantity">{{ product.quantity }}</div>
          </div>
        </div>
        <div class="text-row">
          <span class="left-text">Subtotal</span>
          <span class="right-text"
            >₦ {{ order.sub_total.toLocaleString() }}</span
          >
        </div>
        <div class="text-row">
          <span class="left-text">Delivery</span>
          <span class="right-text"
            >₦ {{ order.delivery_cost.toLocaleString() }}</span
          >
        </div>
        <div class="text-row">
          <span class="left-text">Total</span>
          <span class="right-text"
            >₦ {{ order.total_price.toLocaleString() }}</span
          >
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div v-if="show" class="loader"></div>
      <span v-else>{{ contentLoaderText }}</span>
    </content-loader>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "@/utils/api.js";
import TopNav from "@/components/TopNav";
import contentLoader from "@/components/contentLoader";
import storage from "@/utils/storage.js";

export default {
  components: {
    TopNav,
    contentLoader,
  },
  data() {
    return {
      address: "",
      user: "",
      fullName: "",
      phone_number: "",
    };
  },
  mounted() {
    this.user = storage.getUser();
    this.fullName = `${this.user.customer.first_name} ${this.user.customer.last_name}`;
    this.address = `${this.user.customer.address.street}, ${this.user.customer.address.lga}, ${this.user.customer.address.state}`;
    this.phone_number = this.user.user.phone_number;
    this.cartCheckout();
  },
  computed: {
    ...mapState({
      order: (state) => state.cartModule.order,
      orderItems: (state) => state.cartModule.orderItems,
      loading: (state) => state.cartModule.loading,
      show: (state) => state.cartModule.show,
    }),
  },
  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    ...mapActions("cartModule", ["cartCheckout", "setLoading"]),

    navigateTo(page) {
      this.$router.push(page);
    },

    payWithSpecta() {
      this.setLoading(false);
      if (this.order.total_price < 20000) {
        this.showModal({
          description:
            "Total amount must be ₦20,000 and above to access our loan service.",
          display: true,
          type: "error",
        });
        this.setLoading(true);
        return;
      }
      const items = this.orderItems.map((item) => {
        return item.name;
      });
      const data = {
        reference: this.getRandomString(10) + this.order.id,
        description: `Payment for ${items}`,
        amount: Math.ceil(this.order.total_price),
      };
      api
        .spectaPaymentUrl(data)
        .then(({ data }) => {
          window.location = data.data;
        })
        .catch((error) => {
          this.showModal({
            description: "Loan payment is down, please contact support.",
            display: true,
            type: "error",
          });
          this.setLoading(true);
        });
    },

    placeOrder() {
      let x = this;
      const handler = PaystackPop.setup({
        key: process.env.VUE_APP_PS_KEY,
        email: x.user.user.email,
        amount: Math.ceil(x.order.total_price * 100),
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
          x.navigateTo("/products/1");
        },
      });
      handler.openIframe();
    },

    getRandomString(length) {
      let randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-`~?><{}][/|.,";
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
