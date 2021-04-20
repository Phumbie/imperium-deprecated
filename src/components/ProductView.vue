<template>
  <div id="product-view" class="container">
    <div class="product" v-if="!loading && productDetails">
      <div class="image-container">
        <img :src="productDetails.display_image" />
      </div>
      <div class="product-details">
        <div class="centered-content">
          <div class="product-name">
            {{ productDetails.name }}
          </div>
          <div class="price" v-if="productDetails.price">
            ₦
            {{
              productDetails.total_price
                ? productDetails.total_price.toLocaleString()
                : productDetails.price.toLocaleString()
            }}
          </div>
          <p class="loan-price" v-if="productDetails.components">
            Loan payment/month: ₦{{ productDetails.components.lto_price }}
          </p>
          <div class="btn-add-to-cart" @click="addProductToCart()">
            Add to cart
          </div>
          <div class="details-label">
            <p>Description</p>
          </div>
          <div>
            <div class="details" v-if="productDetails.description">
              {{ productDetails.description | setUppercase }}
            </div>
            <div class="details" v-else>
              {{
                `Solar PV: ${productDetails.components.solar_PV}, MPPT Controller: ${productDetails.components.MPPT_controller}, Inverter: ${productDetails.components.battery_inverter}, Lead Battery: ${productDetails.components.lead_battery}`
              }}
            </div>
            <div
              class="details extra-details"
              v-if="productDetails.recommended_load.length > 0"
            >
              <label>Recommended load</label>
              <ul>
                <li
                  v-for="(load, index) in productDetails.recommended_load"
                  :key="index"
                >
                  {{ `${load.load}` | setUppercase }} &#45;
                  {{ `${load.quantity}pcs` }}
                </li>
              </ul>
              <label>Delivery location</label>
              <ul>
                <li class="bullet">
                  Nation wide
                </li>
              </ul>
            </div>
            <div
              class="details extra-details"
              v-if="productDetails.vendor_location.length > 0"
            >
              <label>Delivery location</label>
              <ul>
                <li
                  v-for="(location, index) in productDetails.vendor_location"
                  :key="index"
                >
                  {{ location | setUppercase }}
                </li>
              </ul>
            </div>
            <div
              class="details extra-details"
              v-if="productDetails.stock.quantity_available"
            >
              <ul>
                <li>
                  {{
                    `Available stock &#45; ${productDetails.stock.quantity_available}pcs`
                  }}
                </li>
                <li v-if="productDetails.components.vat">
                  {{ `Vat &#45; ${productDetails.components.vat}% Inclusive` }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-text-28" v-if="!loading">
      <p>Similar Products</p>
    </div>
    <div class="products-container" v-if="!loading && similarProducts">
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
          <div class="product-description" v-if="products.description">
            {{ products.description | shortenString | setUppercase }}
          </div>
          <div class="product-description" v-else>
            <p>
              Solar PV:
              {{ products.components.solar_PV | shortenString | setUppercase }}
            </p>
            <p>
              Inverter:
              {{
                products.components.battery_inverter
                  | shortenString
                  | setUppercase
              }}
            </p>
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
