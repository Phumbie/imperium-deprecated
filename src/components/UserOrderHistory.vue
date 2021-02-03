<template>
  <div id="user-order-history" class="container" v-if="loading">
    <section class="header-section">
      <div class="header-text-28">Order Details</div>
    </section>
    <Modal v-show="isModalVisible" @close="closeModal" />
    <section class="order-details-section">
      <div class="details-container">
        <div class="box">
          <label for="name">Name</label>
          <div class="info-text capitalize">{{ this.userFullName }}</div>
          <label for="email">Email</label>
          <div class="info-text">{{ this.userDetails.user.email }}</div>
          <label for="address">Address</label>
          <div class="info-text margin-bottom-zero  capitalize">
            {{
              `${this.userDetails.customer.address.street}, ${this.userDetails.customer.address.lga}, ${this.userDetails.customer.address.state}.`
            }}
          </div>
        </div>
        <div class="box border-left border-top-none">
          <label>Total item</label>
          <div class="info-text">
            {{ this.totalItems }}
          </div>
          <label>Payment method</label>
          <div class="info-text capitalize">
            {{ this.placedOrder.payment_method }}
          </div>
          <label>Order ID</label>
          <div class="info-text margin-bottom-zero ">
            {{ this.placedOrder.id }}
          </div>
        </div>
        <div class="box border-left border-left-none">
          <div>
            <label>Sub-Total</label>
            <div class="info-text">
              ₦ {{ this.placedOrder.sub_total.toLocaleString() }}
            </div>
          </div>
          <div>
            <label>Delivery</label>
            <div class="info-text">
              ₦ {{ this.placedOrder.delivery_cost.toLocaleString() }}
            </div>
          </div>
          <div>
            <label>Total</label>
            <div class="info-text margin-bottom-zero ">
              ₦ {{ this.placedOrder.total_price.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="order-item-section">
      <span class="header-text-28">Items</span>
      <!-- <ul v-if="this.placedOrder.status === 'placed'">
        <li>
          <button class="text-edit" @click="showModal">Cancel Order</button>
        </li>
      </ul> -->
      <div class="products-container">
        <div
          class="product-item"
          v-for="(item, index) in orderItems"
          :key="index"
        >
          <div class="centered-content" v-if="item.price">
            <div class="image-container">
              <img :src="`${item.display_image}`" />
            </div>
            <div class="product-name truncate-name">{{ item.name }}</div>
            <label>Price</label>
            <div class="small-gray-text">
              ₦ {{ item.price.toLocaleString() }}
            </div>
            <label>Quantity</label>
            <div class="small-gray-text margin-bottom-zero">
              {{ item.quantity }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Modal from "@/components/modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      loading: false,
      userDetails: "",
      userFullName: "",
      totalItems: 0,
      placedOrder: [],
      orderItems: [],
      date: "",
      isModalVisible: false,
    };
  },
  mounted() {
    if (!localStorage.getItem("user_details")) {
      this.navigateTo("login");
      return;
    }
    this.viewOrder();
  },

  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    viewOrder() {
      this.placedOrder = JSON.parse(localStorage.getItem("placed_order"));
      this.userDetails = JSON.parse(localStorage.getItem("user_details"));
      this.placedOrder.items.map((item) => {
        this.totalItems += item.quantity;
      });
      if (this.placedOrder.items.length < 4) {
        let emptyProductSpace = 4 - this.placedOrder.items.length;
        let emptyObject = {};
        let emptyProductArray = new Array(emptyProductSpace).fill(emptyObject);
        this.orderItems = this.placedOrder.items.concat(emptyProductArray);
      } else {
        this.orderItems = this.placedOrder.items;
      }
      this.userFullName = `${this.userDetails.customer.first_name} ${this.userDetails.customer.last_name}`;
      this.loading = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/order-history.scss";
</style>
