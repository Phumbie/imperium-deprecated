<template>
  <div id="product-view">
    <div class="product" v-if="fetchedProductDetails">
      <div class="image-container">
        <img :src="productDetails.display_image" />
      </div>
      <div class="product-details">
        <div class="centered-content">
          <div class="product-name">
            {{ productDetails.name }}
          </div>
          <div class="price">₦ {{ productDetails.price.toLocaleString() }}</div>
          <div class="btn-add-to-cart" @click="addProductToCart()">
            Add to cart
          </div>
          <div class="details-label">
            <div>
              <div class="nav-link">
                Description
              </div>
            </div>
          </div>
          <div>
            <div class="details">
              {{ productDetails.description }}
            </div>
            <div class="details extra-details">
              <p>What's more?</p>
              <p>
                We offer a Guarantee on the Quality of solutions you get from
                our installer partners as a consumer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-text-28" v-if="fetchedProductDetails">
      <p>Similar Products</p>
    </div>
    <div class="products-container" v-if="fetchedProductDetails">
      <div
        class="product-item"
        v-for="products in similarProducts"
        :key="products.created_at"
        @click="navigateTo(`/product/${products.slug}/id/${products.id}`)"
      >
        <div class="centered-content" v-if="products.price">
          <div class="image-container">
            <img :src="products.display_image" />
          </div>
          <div class="product-name truncate-name">
            {{ products.name | shortenString | setUppercase }}
          </div>
          <div class="product-description">
            {{ products.description | shortenString | setUppercase }}
          </div>
          <div class="price">₦ {{ products.price.toLocaleString() }}</div>
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div class="loader"></div>
    </content-loader>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import contentLoader from "@/components/contentLoader";

export default {
  name: "ProductView",
  components: {
    contentLoader,
  },
  data() {
    return {
      productSlug: "",
      productId: "",
      productDetails: {},
      similarProducts: [],
      fetchedProductDetails: false,
    };
  },
  mounted() {
    this.getProductDetails();
  },
  methods: {
    ...mapActions("notificationModule", ["showToast"]),
    navigateTo(page) {
      if (
        page.split("/")[2] === "undefined" ||
        page === this.$router.currentRoute.fullPath
      ) {
        return;
      }
      this.$router.push(page);
      this.getProductDetails();
    },
    getProductDetails() {
      (this.fetchedProductDetails = false),
        (this.productSlug = this.$route.params.slug);
      api
        .getProductBySlug(this.productSlug)
        .then(({ data }) => {
          this.productDetails = data.data;
          this.fetchedProductDetails = true;
          api
            .getSimilarProducts(data.data.category, 100000)
            .then((response) => {
              if (response.data.data.result.length > 4) {
                this.similarProducts = response.data.data.result.slice(-4);
              } else {
                this.similarProducts = response.data.data.result;
              }
              if (response.data.data.result.length < 4) {
                let emptyProductSpace = 4 - response.data.data.result.length;
                let emptyObject = {};
                let emptyProductArray = new Array(emptyProductSpace).fill(
                  emptyObject
                );
                this.similarProducts = shuffleArray(
                  response.data.data.result
                ).concat(emptyProductArray);
              } else {
                this.similarProducts = shuffleArray(
                  response.data.data.result
                ).slice(-4);
              }
            });
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    addProductToCart() {
      this.productId = this.$route.params.id;
      if (!localStorage.getItem("user_details")) {
        let mathcingProducts = false;
        let localDetails = JSON.parse(localStorage.getItem("product_id"));
        localDetails.map((items) => {
          if (items.id == this.productId) {
            if (items.quantity < this.productDetails.stock.quantity_available) {
              items.quantity += 1;
              items.subtotal += this.productDetails.price;
              mathcingProducts = true;
              this.$store.dispatch("incrementCartCounter");
              this.showToast({
                description: "Added to cart",
                display: true,
                type: "success",
              });
            } else {
              this.$swal.fire({
                type: "info",
                html: `We have only ${this.productDetails.stock.quantity_available} of this Product left`,
              });
              mathcingProducts = true;
            }
            return;
          }
        });
        if (!mathcingProducts) {
          if (this.productDetails.stock.quantity_available === 0) {
            this.$swal.fire({
              type: "info",
              html: "Product is not available",
            });
            return;
          }
          let productDetails = {
            id: this.productId,
            quantity: 1,
            subtotal: this.productDetails.price,
          };
          localDetails.push(productDetails);
          this.$store.dispatch("incrementCartCounter");
          this.showToast({
            description: "Added to cart",
            display: true,
            type: "success",
          });
        }
        localStorage.setItem("product_id", JSON.stringify(localDetails));
      } else {
        api
          .addProductToCart(this.productId)
          .then(({ data }) => {
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
            this.showToast({
              description: "Added to cart",
              display: true,
              type: "success",
            });
          })
          .catch(({ response }) => {
            this.$swal.fire({
              icon: "info",
              html: response.data.message,
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/product-view.scss";
</style>
