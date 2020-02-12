<template>
  <div id="user-account" v-if="loading">
    <div class="header-text-28 display-none">My Account</div>
    <button class="button-logout small-text" @click="logout()">Logout</button>
    <div class="section-title">Account Details</div>
    <span class="edit">
      <router-link to="my-account/update" class="header-text-28 text-edit"
        >Edit</router-link
      >
    </span>
    <div class="details-container">
      <div class="box border-right border-bottom">
        <div class="small-header-text">Personal details</div>
        <div class="info-text capitalize">{{ userFullName }}</div>
        <div class="info-text">{{ userDetails.user.email }}</div>
        <div class="info-text">Non binary</div>
        <div class="info-text">{{ userDetails.user.phone_number }}</div>
      </div>
      <div class="box">
        <div class="small-header-text">Address</div>
        <div class="info-text capitalize">
          {{ userDetails.address.street }},
        </div>
        <div class="info-text capitalize">{{ userDetails.address.lga }},</div>
        <div class="info-text capitalize">{{ userDetails.address.state }}.</div>
      </div>
    </div>
    <span class="section-title">Order History</span>
    <div class="products-container" v-if="hasHistory">
      <div
        class="product-item"
        v-for="(order, index) in orderHistory"
        :key="index"
      >
        <div class="centered-content">
          <div class="image-container">
            <img :src="`${order.items[0].display_image}`" />
          </div>
          <div class="small-gray-text wrap">
            {{ `Order ID: ${order.transaction_id}` }}
          </div>
          <div class="small-gray-text">
            {{ `Date: ${order.created_at.split("T")[0]}` }}
          </div>
          <div class="small-gray-text">{{ `Status: ${order.status}` }}</div>
          <button
            ref="btn"
            :disabled="disabledBtn"
            to="my-account/order-history"
            tag="button"
            class="button-view-order"
            @click="getOrderHistoryById(order.id)"
          >
            View Order
          </button>
        </div>
      </div>
    </div>
    <content-loader v-else>
      <span>{{ contentLoaderText }}</span>
    </content-loader>
    <span class="section-title">Power As A Service</span>
    <div class="paas-active-plan-container">
      You have no active power as a service plan
    </div>
  </div>
  <content-loader v-else>
    <div v-if="show" class="loader"></div>
  </content-loader>
</template>

<script>
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader";
import { TweenMax } from "gsap";

export default {
  name: "UserAccount",
  components: {
    contentLoader
  },
  data() {
    return {
      loading: false,
      hasHistory: false,
      disabledBtn: false,
      userDetails: "",
      userFullName: "",
      orderHistory: [],
      contentLoaderText: "",
      show: true
    };
  },
  mounted() {
    if (!localStorage.getItem("user_details")) {
      this.navigateTo("login");
      return;
    }

    this.userDetails = JSON.parse(localStorage.getItem("user_details"));
    this.userFullName = `${this.userDetails.first_name} ${this.userDetails.last_name}`;

    api
      .getCustomerOrder()
      .then(data => {
        if (data.data.status == "success") {
          this.orderHistory = data.data.data.orders.result;
          this.orderHistory.length === 0
            ? (this.hasHistory = false)
            : (this.hasHistory = true);
          this.contentLoaderText = "Nothing to show";
          this.loading = true;
        }
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.navigateTo("login");
    },
    navigateTo(page) {
      this.$router.push(page);
    },
    getOrderHistoryById(orderId) {
      const { btn } = this.$refs;
      TweenMax.to(btn, 2, { cursor: "not-allowed" });
      //disable button when clicked
      this.disabledBtn = true;
      api
        .getCustomerOrderById(orderId)
        .then(({ data }) => {
          if (data.status == "success") {
            localStorage.setItem("placed_order", JSON.stringify(data.data));
            localStorage.setItem(
              "placed_items",
              JSON.stringify(data.data.items)
            );
          }
          this.navigateTo("my-account/order-history");
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
