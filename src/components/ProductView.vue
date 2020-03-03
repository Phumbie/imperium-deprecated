<template>
  <div id="product-view">
    <div v-if="fetchedProductDetails">
      <div class="product">
        <div class="image-container">
          <img :src="productDetails.display_image" />
        </div>
        <div class="product-details">
          <div class="centered-content">
            <div class="product-name">{{ productDetails.name }}</div>
            <div class="price">
              ₦ {{ productDetails.price.toLocaleString() }}
            </div>
            <div class="btn-add-to-cart" @click="addProductToCart()">
              Add to cart
            </div>
            <div class>
              <div class="loan-calc-title duration-margin">Loan Calculator</div>
              <div class="loan-calc-details">
                Loan Amount (+5% VAT and Service Fee)
                <span class="loan-calc-value"
                  >₦ {{ loanAmount.toLocaleString() }}</span
                >
              </div>
              <div class="loan-calc-details duration-margin">
                Deposit(Min 30%)
                <span class="loan-calc-value"
                  >₦ {{ loanDeposit.toLocaleString() }}</span
                >
              </div>
              <input
                type="range"
                :min="minDeposit"
                :max="loanAmount"
                v-model="loanDeposit"
                @change="deposit()"
                class="slider"
              />
              <div class="loan-calc-details duration-margin">
                Duration
                <span class="loan-calc-value" v-text="rangeDuration"></span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                v-model="monthValue"
                class="slider"
                @change="duration()"
              />
              <div class="loan-calc-details monthly-payment">
                Monthly Repayment:
                <span class="loan-calc-value monthly-payment"
                  >₦ {{ instalment.toLocaleString() }}</span
                >
              </div>
              <div class="btn-add-to-cart" @click="addProductToCart()">
                Pay Installmentally
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-desc-conf-set">
        <div class="nav-link" @click="activeTabID = 0">
          <div class="nav-desc-conf-set__item">Description</div>
          <div class="line-black" v-if="activeTabID == 0"></div>
        </div>
        <div class="nav-link" @click="activeTabID = 1">
          <div class="nav-desc-conf-set__item">Product Details</div>
          <div class="line-black" v-if="activeTabID == 1"></div>
        </div>
        <div class="nav-link" @click="activeTabID = 2">
          <div class="nav-desc-conf-set__item">Setup</div>
          <div class="line-black" v-if="activeTabID == 2"></div>
        </div>
      </div>
      <div class="long-details" v-if="activeTabID == 0">
        {{ productDetails.description }}
      </div>
      <div class="long-details" v-else-if="activeTabID == 1">
        <p>Manufacturer: {{ productDetails.manufacturer }}</p>
        <p>SKU: {{ productDetails.model_id }}</p>
        <p>Capacity: {{ productDetails.capacity }}</p>
        <p>Weight: {{ productDetails.weight }}</p>
      </div>
      <div class="long-details" v-else>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi voluptas
        ad placeat fuga in corrupti veri
      </div>
      <div class="header-text-28">Similar Products</div>
      <div class="products-container">
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
            <div class="small-text-18">{{ products.name }}</div>
            <div class="small-gray-text truncate">
              {{ products.description }}
            </div>
            <div class="small-gray-text">
              ₦ {{ products.price.toLocaleString() }}
            </div>
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
import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import contentLoader from "@/components/contentLoader";

export default {
  name: "ProductView",
  components: {
    contentLoader
  },
  data() {
    return {
      productSlug: "",
      productId: "",
      productDetails: {},
      similarProducts: [],
      fetchedProductDetails: false,
      activeTabID: 0,
      loanAmount: "",
      loanDeposit: "",
      minDeposit: this.loanDeposit,
      outstandingPayment: "",
      instalment: "",
      monthValue: 1
    };
  },
  mounted() {
    this.getProductDetails();
  },
  computed: {
    rangeDuration() {
      return `${this.monthValue} Month(s)`;
    },
    totalDeposit() {
      return `₦ ${this.loanDeposit}`;
    }
  },
  methods: {
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

    deposit() {
      this.outstandingPayment = this.loanAmount - this.loanDeposit;
      this.instalment = Math.ceil(this.outstandingPayment / this.monthValue);
    },

    duration() {
      this.instalment = Math.ceil(
        this.outstandingPayment / this.monthValue
      ).toLocaleString();
    },

    getProductDetails() {
      (this.fetchedProductDetails = false),
        (this.productSlug = this.$route.params.slug);
      api
        .getProductBySlug(this.productSlug)
        .then(({ data }) => {
          this.productDetails = data.data;
          this.fetchedProductDetails = true;
          //vat calculation
          this.vat = this.productDetails.price * 0.05;
          //service charge calculation
          this.serviceCharge = this.productDetails.price * 0.1;
          //total loan amount
          this.loanAmount = Math.ceil(
            this.productDetails.price + this.vat + this.serviceCharge
          );
          //loan deposit calculation
          this.loanDeposit = Math.ceil(this.loanAmount * 0.3);
          this.minDeposit = this.loanDeposit;
          this.deposit();
          this.duration();
          api.getSimilarProducts(data.data.category, 100000).then(response => {
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
        localDetails.map(items => {
          if (items.id == this.productId) {
            if (items.quantity < this.productDetails.stock.quantity_available) {
              items.quantity += 1;
              items.subtotal += this.productDetails.price;
              mathcingProducts = true;
              this.$store.dispatch("incrementCartCounter");
              this.$swal.fire({
                position: "top",
                icon: "success",
                width: 150,
                html: "Added",
                showConfirmButton: false,
                timer: 1000,
                toast: true
              });
            } else {
              this.$swal.fire({
                type: "info",
                html: `We have only ${this.productDetails.stock.quantity_available} of this Product left`
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
              html: "Product is not available"
            });
            return;
          }
          let productDetails = {
            id: this.productId,
            quantity: 1,
            subtotal: this.productDetails.price
          };
          localDetails.push(productDetails);
          this.$store.dispatch("incrementCartCounter");
          this.$swal.fire({
            position: "top",
            icon: "success",
            width: 150,
            html: "Added",
            showConfirmButton: false,
            timer: 1000,
            toast: true
          });
        }

        localStorage.setItem("product_id", JSON.stringify(localDetails));
        // alert("Successfully added product to cart!");
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
            data.data.cart.items.map(item => {
              newQuantity += item.quantity;
              this.$store.dispatch("setCartCounter", newQuantity);
              localStorage.setItem("cartCounter", JSON.stringify(newQuantity));
            });
            this.$swal.fire({
              position: "top",
              icon: "success",
              width: 150,
              html: "Added",
              showConfirmButton: false,
              timer: 1000,
              toast: true
            });
          })
          .catch(({ response }) => {
            this.$swal.fire({
              icon: "info",
              html: response.data.message
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
