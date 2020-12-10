<template>
  <div id="cart-section">
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
                &#45;
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
          v-for="(n, index) in localCartItem.length"
          :key="index"
        >
          <div class="product-details">
            <div class="image-container">
              <img :src="localCartItem[index].display_image" />
            </div>
            <div class="product-name-price">
              <div class="product-name capitalize">
                {{ localCartItem[index].name }}
              </div>
              <div class="price">
                ₦ {{ localCartItem[index].price.toLocaleString() }}
              </div>
              <div class="cart-item-description">
                {{ localCartItem[index].description }}
              </div>
              <button
                class="button-remove"
                @click="removeProductFromCart(localCartItem[index].id)"
              >
                Remove
              </button>
            </div>
            <div class="quantity">
              <button @click="decreaseProductQuantity(localCartItem[index].id)">
                -
              </button>
              <span>{{ localCartItem[index].quantity }}</span>
              <button @click="increaseProductQuantity(localCartItem[index].id)">
                +
              </button>
            </div>
            <div class="amount">
              <div>
                ₦
                {{
                  (
                    localCartItem[index].price * localCartItem[index].quantity
                  ).toLocaleString()
                }}
              </div>
            </div>
            <button
              class="mobile-button-remove"
              @click="removeProductFromCart(localCartItem[index].id)"
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
        <button @click="navigateTo('/products')">Continue shopping</button>
        <button class="bg-black" @click="checkout()">Check out</button>
      </div>
    </section>
    <section class="checkout-button-section" v-else-if="fetchedLocalStorage">
      <div class="subtotal-section">
        <span>Subtotal</span>
        <span>₦ {{ subtotalArr.toLocaleString() }}</span>
      </div>
      <div class="text">Delivery and taxes are calculated at checkout</div>
      <div class="buttons">
        <button @click="navigateTo('/products')">Continue shopping</button>
        <button class="bg-black" @click="checkout()">Check out</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
      fetchedLocalStorage: false,
      productsList: [],
      localCartItem: [],
      localCart: [],
      subtotalArr: [],
      customerCart: {},
      contentLoaderText: "",
      show: true,
    };
  },
  mounted() {
    this.getCart();
  },
  computed: {
    cartItems: function() {
      return this.customerCart.cart.items;
    },
    subtotal: function() {
      return this.customerCart.sub_total;
    },
  },
  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    navigateTo(page) {
      this.$router.push(page);
    },
    getCart() {
      if (!localStorage.getItem("user_details")) {
        api
          .getAllProductsQuery_per_page(100000000)
          .then(({ data }) => {
            this.productsList = data.data.result;
            JSON.parse(localStorage.getItem("product_id")).map((item) => {
              this.productsList.map((product) => {
                if (product.id === item.id) {
                  product.local_id = item.id;
                  product.quantity = item.quantity;
                  product.subtotal = item.subtotal;
                  this.localCartItem.push(product);
                }
              });
            });
            JSON.parse(localStorage.getItem("product_id")).map(
              (item, index) => {
                this.subtotalArr.push(item.subtotal);
              }
            );
            localStorage.setItem(
              "subtotal_arr",
              JSON.stringify(this.subtotalArr)
            );
            localStorage.setItem(
              "local_cart",
              JSON.stringify(this.localCartItem)
            );
            this.subtotalArr = this.subtotalArr.reduce((acc, value) => {
              return acc + value;
            }, 0);
            localStorage.setItem("subtotal", JSON.stringify(this.subtotalArr));
            this.checkIfLocalStorageIsEmpty();
          })
          .catch((error) => {
            this.$swal.fire({
              icon: "info",
              html: error.message,
            });
          });
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
          this.$swal.fire({
            icon: "info",
            html: error.message,
          });
        });
    },
    removeProductFromCart(productId) {
      if (!localStorage.getItem("user_details")) {
        let local_items = JSON.parse(localStorage.getItem("product_id"));
        let counter = JSON.parse(localStorage.getItem("cartCounter"));
        local_items.map((item, index) => {
          if (item.id === productId) {
            counter -= item.quantity;
            item.quantity = 0;
            this.subtotalArr -= item.subtotal;
            local_items.splice(index, 1);
            this.$store.dispatch("setCartCounter", counter);
            localStorage.setItem("cartCounter", JSON.stringify(counter));
          }
        });
        localStorage.setItem("product_id", JSON.stringify(local_items));
        this.localCartItem = [];
        JSON.parse(localStorage.getItem("product_id")).map((item) => {
          this.productsList.map((product) => {
            if (product.id === item.id) {
              product.local_id = item.id;
              product.quantity = item.quantity;
              this.localCartItem.push(product);
            }
          });
        });
        localStorage.setItem("local_cart", JSON.stringify(this.localCartItem));
        this.checkIfLocalStorageIsEmpty();
        this.showToast({
          description: "Removed from cart",
          display: true,
          type: "success",
        });
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
        let localCart = JSON.parse(localStorage.getItem("local_cart"));
        let localQuantity = JSON.parse(localStorage.getItem("product_id"));
        localCart.map((item) => {
          localQuantity.map((items) => {
            if (item.quantity == 0) {
              return;
            }
            if (
              item.id === productId &&
              items.id === productId &&
              item.quantity !== 0
            ) {
              item.quantity = item.quantity -= 1;
              items.quantity = items.quantity -= 1;
              items.subtotal -= item.price;
              this.subtotalArr -= item.price;
              localStorage.setItem("local_cart", JSON.stringify(localCart));
              localStorage.setItem("product_id", JSON.stringify(localQuantity));
              this.localCartItem = JSON.parse(
                localStorage.getItem("local_cart")
              );
              this.$store.dispatch("decrementCartCounter");
            }
          });
        });
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
          this.$swal.fire({
            icon: "info",
            html: response.data.message,
          });
        });
    },
    increaseProductQuantity(productId) {
      if (!localStorage.getItem("user_details")) {
        let localCart = JSON.parse(localStorage.getItem("local_cart"));
        let localQuantity = JSON.parse(localStorage.getItem("product_id"));
        localCart.map((item) => {
          localQuantity.map((items) => {
            if (
              item.quantity === item.stock.quantity_available &&
              items.id === productId &&
              item.id === productId
            ) {
              this.$swal.fire({
                icon: "info",
                html: `We have only ${item.stock.quantity_available} of this Product left`,
              });
              return;
            }
            if (
              item.id === productId &&
              items.id === productId &&
              item.quantity !== item.stock.quantity_available
            ) {
              item.quantity = item.quantity += 1;
              items.quantity = items.quantity += 1;
              items.subtotal += item.price;
              this.subtotalArr += item.price;
              localStorage.setItem("local_cart", JSON.stringify(localCart));
              localStorage.setItem("product_id", JSON.stringify(localQuantity));
              this.localCartItem = JSON.parse(
                localStorage.getItem("local_cart")
              );
              this.$store.dispatch("incrementCartCounter");
              return;
            }
          });
        });
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
          this.$swal.fire({
            icon: "info",
            html: response.data.message,
          });
        });
    },
    checkout() {
      this.fetchedCart = false;
      if (!localStorage.getItem("user_details")) {
        this.showModal({
          description: "You have to login or signup to check out 🙃",
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
