<template>
  <div id="user-account" v-if="loading">
    <section class="header-section">
      <div class="header-text-28">My Account</div>
      <ul>
        <li>
          <button class="text-edit" @click="logout()">Logout</button>
        </li>
      </ul>
    </section>
    <section class="account-details-section">
      <div class="header-text-28">Account Details</div>
      <span>
        <router-link to="my-account/update" class="edit">Edit</router-link>
      </span>
      <div class="details-container">
        <div class="box">
          <label>Personal Details</label>
          <div class="info-text capitalize">{{ userFullName }}</div>
          <div class="info-text">{{ userDetails.user.email }}</div>
          <div class="info-text margin-bottom-zero">
            {{ userDetails.user.phone_number }}
          </div>
        </div>
        <div class="box border-left">
          <label>Address</label>
          <div class="info-text capitalize">
            {{ userDetails.customer.address.street }},
          </div>
          <div class="info-text capitalize">
            {{ userDetails.customer.address.lga }},
          </div>
          <div class="info-text margin-bottom-zero capitalize">
            {{ userDetails.customer.address.state }}.
          </div>
        </div>
      </div>
    </section>
    <section class="order-history-section" v-if="hasHistory">
      <div class="header-text-28">Order History</div>
      <div class="products-container">
        <div
          class="product-item"
          v-for="(order, index) in orderHistory"
          :key="index"
        >
          <div class="centered-content" v-if="order.items">
            <div class="image-container">
              <img :src="`${order.items[0].display_image}`" />
            </div>
            <label>Status</label>
            <div class="small-gray-text">
              {{ `${order.status}` }}
            </div>
            <label>Date</label>
            <div class="small-gray-text">
              {{ `${order.created_at.split("T")[0]}` }}
            </div>
            <button
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
    </section>
    <content-loader v-else>
      <span>{{ contentLoaderText }}</span>
    </content-loader>
    <div class="pagination">
      <el-pagination
        :background="false"
        @current-change="handlePageChange"
        :hide-on-single-page="true"
        :page-size="this.pagination.per_page"
        :current-page="this.pagination.page"
        :pager-count="9"
        layout="prev, pager, next"
        :total="this.pagination.totalRecords"
      >
      </el-pagination>
    </div>
    <!-- <span class="section-title">Power As A Service</span>
    <div class="paas-active-plan-container">
      You have no active power as a service plan
    </div> -->
  </div>
  <content-loader v-else>
    <div v-if="show" class="loader"></div>
  </content-loader>
</template>

<script>
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader";

export default {
  name: "UserAccount",
  components: {
    contentLoader,
  },
  data() {
    return {
      loading: false,
      hasHistory: false,
      userDetails: "",
      userFullName: "",
      orderHistory: [],
      contentLoaderText: "",
      pagination: "",
      page: 1,
      show: true,
    };
  },
  mounted() {
    if (!localStorage.getItem("user_details")) {
      this.navigateTo("login");
      return;
    }

    this.userDetails = JSON.parse(localStorage.getItem("user_details"));
    if (this.userDetails.customer === undefined) {
      localStorage.clear();
      this.navigateTo("login");
      return;
    }
    this.userFullName = `${this.userDetails.customer.first_name} ${this.userDetails.customer.last_name}`;
    this.getOrders();
  },
  methods: {
    logout() {
      localStorage.clear();
      this.navigateTo("login");
    },
    navigateTo(page) {
      this.$router.push(page);
    },
    handlePageChange(page) {
      this.loading = false;
      this.page = page;
      // this.$router.push({ path: "/my-account", query: { page: page } });
      this.getOrders();
    },
    getOrders() {
      api
        .getCustomerOrder(this.page)
        .then((response) => {
          if (response.data.data.orders.result.length < 4) {
            let emptyProductSpace = 4 - response.data.data.orders.result.length;
            let emptyObject = {};
            let emptyProductArray = new Array(emptyProductSpace).fill(
              emptyObject
            );
            this.pagination = response.data.data.orders;
            this.orderHistory = response.data.data.orders.result.concat(
              emptyProductArray
            );
            this.orderHistory.length === 0
              ? (this.hasHistory = false)
              : (this.hasHistory = true);
            this.contentLoaderText = "Nothing to show";
            this.loading = true;
          } else {
            this.pagination = response.data.data.orders;
            this.orderHistory = response.data.data.orders.result;
            this.orderHistory.length === 0
              ? (this.hasHistory = false)
              : (this.hasHistory = true);
            this.contentLoaderText = "Nothing to show";
            this.loading = true;
          }
        })
        .catch(({ response }) => {
          this.$swal.fire({
            position: "top",
            icon: "error",
            width: 200,
            html: "invalid account",
            showConfirmButton: false,
            timer: 1000,
            toast: true,
          });
          localStorage.clear();
          this.navigateTo("login");
        });
    },
    getOrderHistoryById(orderId) {
      this.loading = false;
      api
        .getCustomerOrderById(orderId)
        .then(({ data }) => {
          if (data.status == "success") {
            localStorage.setItem("placed_order", JSON.stringify(data.data));
          }
          this.navigateTo("my-account/order-history");
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/user-account.scss";
</style>
