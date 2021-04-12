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
        <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
          <div class="product-details">
            <div class="image-container">
              <img :src="item.product.display_image" />
            </div>
            <div class="product-name-price">
              <div class="product-name capitalize">
                {{ item.product.name }}
              </div>
              <div class="price">
                ₦
                {{
                  item.product.total_price
                    ? item.product.total_price.toLocaleString()
                    : item.product.price.toLocaleString()
                }}
              </div>
              <div class="cart-item-description">
                {{ item.product.description }}
              </div>
              <button
                class="button-remove"
                @click="removeProductFromCart(item.product.id)"
              >
                Remove
              </button>
            </div>
            <div class="quantity">
              <button @click="decreaseProductQuantity(item.product.id)">
                &#8722;
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseProductQuantity(item.product.id)">
                &#43;
              </button>
            </div>
            <div class="amount">
              <div v-if="item.product.total_price">
                ₦
                {{
                  (item.product.total_price * item.quantity).toLocaleString()
                }}
              </div>
              <div v-else>
                ₦
                {{ (item.product.price * item.quantity).toLocaleString() }}
              </div>
            </div>
            <button
              class="mobile-button-remove"
              @click="removeProductFromCart(item.product.id)"
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
import contentLoader from "@/components/contentLoader";

export default {
  name: "ShoppingCart",
  components: {
    contentLoader,
  },
  data() {
    return {};
  },
  mounted() {
    this.getCart();
  },
  computed: {
    ...mapState({
      fetchedLocalStorage: (state) => state.cartModule.fetchedLocalStorage,
      fetchedCart: (state) => state.cartModule.fetchedCart,
      localCartItem: (state) => state.cartModule.localCartItem,
      cartItems: (state) => state.cartModule.cartItems,
      subtotal: (state) => state.cartModule.subtotal,
      localSubtotal: (state) => state.cartModule.localSubtotal,
      contentLoaderText: (state) => state.cartModule.contentLoaderText,
      show: (state) => state.cartModule.show,
    }),
  },
  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    ...mapActions("cartModule", [
      "getLocalCart",
      "removeFromLocalCart",
      "decreaseLocalCart",
      "increaseLocalCart",
      "getOnlineCart",
      "removeFromCart",
      "decreaseFromCart",
      "increaseFromCart",
    ]),
    navigateTo(page) {
      this.$router.push(page);
    },
    getCart() {
      if (!localStorage.getItem("user_details")) {
        this.getLocalCart();
        return;
      }
      this.getOnlineCart();
    },
    removeProductFromCart(productId) {
      if (!localStorage.getItem("user_details")) {
        this.removeFromLocalCart(productId);
        return;
      }
      this.removeFromCart(productId);
    },
    decreaseProductQuantity(productId) {
      if (!localStorage.getItem("user_details")) {
        this.decreaseLocalCart(productId);
        return;
      }
      this.decreaseFromCart(productId);
    },
    increaseProductQuantity(productId) {
      if (!localStorage.getItem("user_details")) {
        this.increaseLocalCart(productId);
        return;
      }
      this.increaseFromCart(productId);
    },
    checkout() {
      if (!localStorage.getItem("user_details")) {
        this.showModal({
          description: "You have to login or signup before you can checkout 🙃",
          display: true,
          type: "info",
        });
        this.navigateTo("/login");
        return;
      }
      this.navigateTo("/checkout");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/cart.scss";
</style>
