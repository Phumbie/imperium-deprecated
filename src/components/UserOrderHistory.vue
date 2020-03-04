<template>
  <div id="user-order-history" v-if="loading">
    <div class="header-text-28">Order Details</div>
    <div class="details-container">
      <div class="box border-right">
        <span class="small-header-text" for="name">Name</span>
        <div class="info-text capitalize">{{ this.userFullName }}</div>
        <span class="small-header-text" for="email">Email</span>
        <div class="info-text">{{ this.userDetails.user.email }}</div>
        <span class="small-header-text" for="address">Address</span>
        <div class="info-text capitalize">
          {{
            `${this.userDetails.address.street}, ${this.userDetails.address.lga}, ${this.userDetails.address.state}.`
          }}
        </div>
      </div>
      <div class="box border-right">
        <span class="small-header-text">Total item</span>
        <div class="info-text">
          {{ this.totalItems }}
        </div>
        <span class="small-header-text">Payment method</span>
        <div class="info-text capitalize">
          {{ this.placedOrder.payment_method }}
        </div>
        <span class="small-header-text">Order ID</span>
        <div class="info-text">
          {{ this.placedOrder.id }}
        </div>
      </div>
      <div class="box border-right-none">
        <span class="small-header-text">Sub-Total</span>
        <div class="info-text">
          ₦ {{ this.placedOrder.sub_total.toLocaleString() }}
        </div>
        <span class="small-header-text">Delivery</span>
        <div class="info-text">
          ₦ {{ this.placedOrder.delivery_cost.toLocaleString() }}
        </div>
        <span class="small-header-text">Total</span>
        <div class="info-text">
          ₦ {{ this.placedOrder.total_price.toLocaleString() }}
        </div>
      </div>
    </div>
    <span class="section-title">Items</span>
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
          <div class="small-text-18 truncate-name">{{ item.name }}</div>
          <label>Price</label>
          <div class="small-gray-text">₦ {{ item.price.toLocaleString() }}</div>
          <label>Quantity</label>
          <div class="small-gray-text">
            {{ item.quantity }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      userDetails: "",
      userFullName: "",
      totalItems: 0,
      placedOrder: [],
      orderItems: [],
      date: ""
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
    viewOrder() {
      this.placedOrder = JSON.parse(localStorage.getItem("placed_order"));
      this.userDetails = JSON.parse(localStorage.getItem("user_details"));
      this.placedOrder.items.map(item => {
        this.totalItems += item.quantity;
      });
      if (JSON.parse(localStorage.getItem("placed_order")).items.length < 4) {
        let emptyProductSpace =
          4 - JSON.parse(localStorage.getItem("placed_order")).items.length;
        let emptyObject = {};
        let emptyProductArray = new Array(emptyProductSpace).fill(emptyObject);
        this.orderItems = JSON.parse(
          localStorage.getItem("placed_order")
        ).items.concat(emptyProductArray);
      } else {
        this.orderItems = JSON.parse(
          localStorage.getItem("placed_order")
        ).items;
      }
      this.userFullName = `${this.userDetails.first_name} ${this.userDetails.last_name}`;
      this.loading = true;
    }
  }
};
</script>

<style lang="scss" scoped>
#user-order-history {
  label {
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(29, 29, 29, 0.5);
  }

  .products-container {
    .product-item {
      .centered-content {
        .small-gray-text {
          font-size: 0.8rem;
          margin: 0rem;
          margin-bottom: 0.5rem;
          letter-spacing: 0.1rem;
          line-height: 1.4rem;
        }
      }
    }
  }

  .truncate-name {
    display: -webkit-box;
    height: 2rem;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
