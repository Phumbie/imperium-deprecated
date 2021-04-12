<template>
  <div id="product-view" class="container">
    <div class="product" v-if="!loading">
      <div class="image-container">
        <img :src="productDetails.display_image" />
      </div>
      <div class="product-details">
        <div class="centered-content">
          <div class="product-name">
            {{ productDetails.name }}
          </div>
          <div class="price">
            ₦
            {{
              productDetails.total_price
                ? productDetails.total_price.toLocaleString()
                : productDetails.price.toLocaleString()
            }}
          </div>
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
    <div class="header-text-28" v-if="!loading">
      <p>Similar Products</p>
    </div>
    <div class="products-container" v-if="!loading">
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
          <div class="price">
            ₦
            {{
              products.total_price
                ? products.total_price.toLocaleString()
                : products.price.toLocaleString()
            }}
          </div>
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div class="loader"></div>
    </content-loader>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import contentLoader from "@/components/contentLoader";
import storage from "@/utils/storage.js";

export default {
  name: "ProductView",
  components: {
    contentLoader,
  },
  data() {
    return {};
  },
  mounted() {
    this.getProductDetails();
  },

  computed: {
    ...mapState({
      loading: (state) => state.productModule.loading,
      productDetails: (state) => state.productModule.productDetails,
      productSlug: (state) => state.productModule.productSlug,
      productId: (state) => state.productModule.productId,
      similarProducts: (state) => state.productModule.similarProducts,
    }),
  },

  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    ...mapActions("productModule", [
      "getProductBySlug",
      "setProductSlug",
      "setProductId",
    ]),
    ...mapActions("cartModule", [
      "addProductToLocalCart",
      "addProductToOnlineCart",
    ]),
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
      this.setProductSlug(this.$route.params.slug);
      this.getProductBySlug(this.productSlug);
    },
    addProductToCart() {
      this.setProductId(this.$route.params.id);
      if (!storage.getUser()) {
        this.addProductToLocalCart();
        return;
      } else {
        this.addProductToOnlineCart(this.productId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/product-view.scss";
</style>
