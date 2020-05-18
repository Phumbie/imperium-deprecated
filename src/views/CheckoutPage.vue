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
    navigateTo(page) {
      this.$router.push(page);
    },
    getNewlyCreatedOrder() {
      return JSON.parse(localStorage.getItem("user_order"));
    },
    placeOrder() {
      let x = this;
      const order = this.getNewlyCreatedOrder();
      const handler = PaystackPop.setup({
        key: "pk_test_a5e5a7ad89b8d468a6482b29dcf2acd7b09a1c18",
        email: "test@gmail.com",
        amount: Math.ceil(this.totalCost * 100),
        currency: "NGN",
        metadata: {
          custom_fields: {
            order_id: order.id,
          },
        },
        callback: function(response) {
          x.$swal.fire({
            position: "top",
            icon: "success",
            width: 280,
            html: "your order is being processed",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          x.navigateTo("/products");
        },
      });
      handler.openIframe();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/checkout.scss";
</style>
