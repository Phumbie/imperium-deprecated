<template>
  <div id="cart-section" class="container">
    <section class="header-section">
      <div class="header-text-28">Shopping Cart</div>
      <div class="header" v-if="fetchedCart || fetchedLocalStorage">
        <div class="table-header column-one display-none">Product details</div>
        <div class="table-header display-none">Quantity</div>
        <div class="table-header display-none">Total amount</div>
      </div>
    </section>
    <section class="cart-details-section">
      <div v-if="fetchedCart">
        <div
          class="cart-item"
          v-for="(n, index) in cartItems.length"
          :key="index"
        >
          <div class="product-details">
            <div class="image-container">
              <img :src="cartItems[index].product.display_image" />
            </div>
            <div class="product-name-price">
              <div class="product-name capitalize">
                {{ cartItems[index].product.name }}
              </div>
              <div class="price">
                ₦ {{ cartItems[index].product.price.toLocaleString() }}
              </div>
              <div class="cart-item-description">
                {{ cartItems[index].product.description }}
              </div>
              <button
                class="button-remove"
                @click="removeProductFromCart(cartItems[index].product.id)"
              >
                Remove
              </button>
            </div>
            <div class="quantity">
              <button
                @click="decreaseProductQuantity(cartItems[index].product.id)"
              >
                &#8722;
              </button>
              <span>{{ cartItems[index].quantity }}</span>
              <button
                @click="increaseProductQuantity(cartItems[index].product.id)"
              >
                &#43;
              </button>
            </div>
            <div class="amount">
              <div>
                ₦
                {{
                  (
                    cartItems[index].product.price * cartItems[index].quantity
                  ).toLocaleString()
                }}
              </div>
            </div>
            <button
              class="mobile-button-remove"
              @click="removeProductFromCart(cartItems[index].product.id)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="fetchedLocalStorage">
        <div
          class="cart-item"
          v-for="(item, index) in localCartItem"
          :key="index"
        >
          <div class="product-details">
            <div class="image-container">
              <img :src="item.display_image" />
            </div>
            <div class="product-name-price">
              <div class="product-name capitalize">
                {{ item.name }}
              </div>
              <div class="price">
                ₦
                {{
                  item.total_price
                    ? item.total_price.toLocaleString()
                    : item.price.toLocaleString()
                }}
              </div>
              <div class="cart-item-description">
                {{ item.description }}
              </div>
              <button
                class="button-remove"
                @click="removeProductFromCart(item.id)"
              >
                Remove
              </button>
            </div>
            <div class="quantity">
              <button @click="decreaseProductQuantity(item.id)">
                &#8722;
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseProductQuantity(item.id)">
                &#43;
              </button>
            </div>
            <div class="amount">
              <div v-if="item.total_price">
                ₦
                {{ (item.total_price * item.quantity).toLocaleString() }}
              </div>
              <div v-else>
                ₦
                {{ (item.price * item.quantity).toLocaleString() }}
              </div>
            </div>
            <button
              class="mobile-button-remove"
              @click="removeProductFromCart(item.id)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <content-loader v-else>
        <div v-if="show" class="loader"></div>
        <span v-else>{{ contentLoaderText }}</span>
      </content-loader>
    </section>
    <section class="checkout-button-section" v-if="fetchedCart">
      <div class="subtotal-section">
        <span>Subtotal</span>
        <span>₦ {{ subtotal.toLocaleString() }}</span>
      </div>
      <div class="text">Delivery and taxes are calculated at checkout</div>
      <div class="buttons">
        <button @click="navigateTo('/products/1')">Continue shopping</button>
        <button class="bg-black" @click="checkout()">Check out</button>
      </div>
    </section>
    <section class="checkout-button-section" v-else-if="fetchedLocalStorage">
      <div class="subtotal-section">
        <span>Subtotal</span>
        <span>₦ {{ localSubtotal.toLocaleString() }}</span>
      </div>
      <div class="text">Delivery and taxes are calculated at checkout</div>
      <div class="buttons">
        <button @click="navigateTo('/products/1')">Continue shopping</button>
        <button class="bg-black" @click="checkout()">Check out</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader";

export default {
  name: "ShoppingCart",
  components: {
    contentLoader,
  },
  data() {
    return {
      fetchedCart: false,
      productsList: [],
      localCart: [],
      subtotalArr: [],
      customerCart: {},
    };
  },
  mounted() {
    this.getCart();
  },
  computed: {
    ...mapState({
      fetchedLocalStorage: (state) => state.cartModule.fetchedLocalStorage,
      localCartItem: (state) => state.cartModule.localCartItem,
      subtotal: (state) => state.cartModule.subtotal,
      localSubtotal: (state) => state.cartModule.localSubtotal,
      contentLoaderText: (state) => state.cartModule.contentLoaderText,
      show: (state) => state.cartModule.show,
    }),
    cartItems: function() {
      return this.customerCart.cart.items;
    },
    subtotal: function() {
      return this.customerCart.sub_total;
    },
  },
  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    ...mapActions("cartModule", [
      "getLocalCart",
      "removeFromLocalCart",
      "decreaseLocalCart",
      "increaseLocalCart",
    ]),
    navigateTo(page) {
      this.$router.push(page);
    },
    getCart() {
      if (!localStorage.getItem("user_details")) {
        this.getLocalCart();
        return;
      }
      api
        .getCart()
        .then(({ data }) => {
          if (data.status == "success") {
            this.customerCart = data.data;
            this.checkIfCartIsEmpty();
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    removeProductFromCart(productId) {
      if (!localStorage.getItem("user_details")) {
        this.removeFromLocalCart(productId);
        return;
      }
      api
        .removeFromCart(productId)
        .then(({ data }) => {
          if (data.status == "success") {
            let newQuantity = 0;
            if (data.data.cart.items.length === 0) {
              newQuantity = 0;
              this.$store.dispatch("setCartCounter", newQuantity);
              localStorage.setItem("cartCounter", JSON.stringify(newQuantity));
            }
            data.data.cart.items.map((item) => {
              newQuantity += item.quantity;
              this.$store.dispatch("setCartCounter", newQuantity);
              localStorage.setItem("cartCounter", JSON.stringify(newQuantity));
            });
            this.customerCart = data.data;
            this.checkIfCartIsEmpty();
            this.showToast({
              description: "Removed from Cart",
              display: true,
              type: "success",
            });
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    checkIfCartIsEmpty() {
      this.fetchedCart = false;
      if (this.cartItems.length == 0) {
        this.show = false;
        this.contentLoaderText = "Nothing to show";
        return;
      }
      this.fetchedCart = true;
    },
    checkIfLocalStorageIsEmpty() {
      this.fetchedLocalStorage = false;
      if (this.localCartItem.length === 0) {
        this.show = false;
        this.contentLoaderText = "Nothing to show";
        return;
      }
      this.fetchedLocalStorage = true;
    },
    decreaseProductQuantity(productId) {
      if (!localStorage.getItem("user_details")) {
        this.decreaseLocalCart(productId);
        return;
      }
      api
        .decreaseProductQuantityInCart(productId)
        .then(({ data }) => {
          if (data.status == "success") {
            let newQuantity = 0;
            if (data.data.cart.items.length === 0) {
              newQuantity = 0;
              this.$store.dispatch("setCartCounter", newQuantity);
              localStorage.setItem("cartCounter", JSON.stringify(newQuantity));
            }
            data.data.cart.items.map((item) => {
              newQuantity += item.quantity;
              this.$store.dispatch("setCartCounter", newQuantity);
              localStorage.setItem("cartCounter", JSON.stringify(newQuantity));
            });
            this.customerCart = data.data;
            this.checkIfCartIsEmpty();
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    increaseProductQuantity(productId) {
      if (!localStorage.getItem("user_details")) {
        this.increaseLocalCart(productId);
        return;
      }
      api
        .addProductToCart(productId)
        .then(({ data }) => {
          if (data.status == "success") {
            let newQuantity = 0;
            if (data.data.cart.items.length === 0) {
              newQuantity = 0;
              this.$store.dispatch("setCartCounter", newQuantity);
              localStorage.setItem("cartCounter", JSON.stringify(newQuantity));
            }
            data.data.cart.items.map((item) => {
              newQuantity += item.quantity;
              this.$store.dispatch("setCartCounter", newQuantity);
              localStorage.setItem("cartCounter", JSON.stringify(newQuantity));
            });
            this.customerCart = data.data;
          }
        })
        .catch(({ response }) => {
          this.showModal({
            description: response.data.message,
            display: true,
            type: "error",
          });
        });
    },
    checkout() {
      this.fetchedCart = false;
      if (!localStorage.getItem("user_details")) {
        this.showModal({
          description: "You have to login or signup to checkout 🙃",
          display: true,
          type: "info",
        });
        this.navigateTo("/login");
        return;
      }
      api
        .cartCheckout()
        .then(({ data }) => {
          if (data.status == "success") {
            localStorage.setItem("user_order", JSON.stringify(data.data.order));
            this.navigateTo("/checkout");
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/cart.scss";
</style>
