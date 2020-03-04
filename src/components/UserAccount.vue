<template>
  <div id="user-account" v-if="loading">
    <div class="header-text-28">My Account</div>
    <button class="text-edit" @click="logout()">Logout</button>
    <div class="section-title">Account Details</div>
    <span class="edit">
      <router-link to="my-account/update" class="text-edit">Edit</router-link>
    </span>
    <div class="details-container">
      <div class="box border-right border-bottom">
        <div class="small-header-text">Personal details</div>
        <div class="info-text capitalize">{{ userFullName }}</div>
        <div class="info-text">{{ userDetails.user.email }}</div>
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
          <!-- <label>Total price</label>
          <div class="small-gray-text">
            ₦ {{ `${order.sub_total.toLocaleString()}` }}
          </div> -->
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
    contentLoader
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
      this.$router.push({ path: "/my-account", query: { page: page } });
      this.getOrders();
    },
    getOrders() {
      api
        .getCustomerOrder(this.page)
        .then(response => {
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
          alert(response.data.message);
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
    }
  }
};
</script>

<style lang="scss" scoped>
#user-account {
  .section-title {
    margin-top: 60px;
    font-size: 1.2rem;
    margin-bottom: 18px;
    letter-spacing: 0.05rem;
  }

  .text-edit {
    font-size: 15px;
    letter-spacing: 0.05rem;
    text-decoration: none;
    color: rgba(29, 29, 29, 0.5);
    font-weight: 500;
    cursor: pointer;
  }

  .text-edit:hover {
    color: #1d1d1d;
  }

  button {
    width: 4rem;
    align-self: center;
    margin-top: 0.2rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    letter-spacing: 0.03rem;
    background: transparent;
    border: none;
  }

  label {
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(29, 29, 29, 0.5);
  }

  .products-container {
    .product-item {
      .centered-content {
        width: 80%;

        .small-gray-text {
          font-size: 0.8rem;
          margin: 0rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1rem;
          line-height: 1.4rem;
        }

        button {
          width: 100%;
          border: 1px solid #1d1d1d;
          padding: 0.8rem 0;
          transition: 0.5s;
        }

        button:hover {
          background-color: #1d1d1d;
          color: white;
        }
      }
    }
  }
}
</style>
