<template>
  <div id="normal-products-section">
    <section class="header-section">
      <div class="header-text-28 capitalize">{{ this.header }}</div>
      <div class="category-nav">
        <div class="category-link" @click="switchCategory('all products')">
          <div class="category">All Products</div>
          <div
            class="underline"
            v-if="this.activeTabID == 'all products'"
          ></div>
        </div>
        <div class="category-link" @click="switchCategory('solar panel')">
          <div class="category">Solar Panels</div>
          <div class="underline" v-if="activeTabID == 'solar panel'"></div>
        </div>
        <div class="category-link" @click="switchCategory('inverter')">
          <div class="category">Inverters</div>
          <div class="underline" v-if="activeTabID == 'inverter'"></div>
        </div>
        <div class="category-link" @click="switchCategory('battery')">
          <div class="category">Batteries</div>
          <div class="underline" v-if="this.activeTabID == 'battery'"></div>
        </div>
        <div class="category-link" @click="switchCategory('accessory')">
          <div class="category">Accessories</div>
          <div class="underline" v-if="activeTabID == 'accessory'"></div>
        </div>

        <div
          class="category-link margin-right-none"
          @click="switchCategory('bundle')"
        >
          <div class="category">Complete Solution</div>
          <div class="underline" v-if="activeTabID == 'bundle'"></div>
        </div>
      </div>
      <div class="mobile-category-nav">
        <el-select
          v-model="activeTabID"
          :placeholder="activeTabID"
          @input="switchCategory"
        >
          <el-option
            v-for="link in links"
            :key="link.value"
            :label="link.label"
            :value="link.value"
          >
          </el-option>
        </el-select>
      </div>
    </section>

    <section class="products-container" v-if="!loading">
      <single-product
        v-for="product in productsList"
        :key="product.id"
        :product="product"
      />
      <div class="product-item" v-for="i in fillProducts"></div>

      <!-- <div
        class="product-item"
        v-for="(product, index) in productsList"
        :key="index"
        @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
      >
        <div class="centered-content" v-if="product.price">
          <div class="image-container">
            <img :src="product.display_image" />
          </div>
          <div class="product-name">{{ product.name | setUppercase }}</div>
          <div class="product-capacity">
            <p>{{ product.description | shortenString | setUppercase }}</p>
          </div>

          <div class="price">
            ₦ {{ product.price ? product.price.toLocaleString() : "" }}
          </div>
        </div>
      </div> -->
    </section>
    <!-- <div class="loader"></div> -->
    <div class="products-container" v-else>
      <skeletonLine
        :height="`30rem`"
        :width="`100%`"
        class="product-item"
        v-for="i in 4"
        :key="i"
        style="padding: 0"
      />
    </div>

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
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import api from "@/utils/api.js";
  // import contentLoader from "@/components/contentLoader";
  import SingleProduct from "@/components/SingleProduct/SingleProduct";
  export default {
    components: {
      // contentLoader,
      SingleProduct,
    },
    data() {
      return {
        productsList: [],
        pagination: "",
        loading: true,
        activeTabID: "",
        header: "all products",
        page: 1,
        links: [
          {
            value: "all products",
            label: "all products",
          },
          {
            value: "solar panel",
            label: "solar panel",
          },
          {
            value: "inverter",
            label: "inverter",
          },
          {
            value: "battery",
            label: "battery",
          },
          {
            value: "accessory",
            label: "accessory",
          },
          {
            value: "bundle",
            label: "bundle",
          },
        ],
      };
    },
    computed: {
      ...mapGetters(["activeTab"]),
      fillProducts() {
        if (this.productsList.length < 4) {
          return 4 - this.productsList.length;
        }
      },
    },
    mounted() {
      if (!JSON.parse(localStorage.getItem("active_tab"))) {
        this.switchCategory(this.activeTab);
      } else {
        let category = JSON.parse(localStorage.getItem("active_tab"));
        this.switchCategory(category);
      }
      this.fetchProducts();
    },

    methods: {
      navigateTo(page) {
        if (page.split("/")[2] === "undefined") {
          return;
        }
        this.$router.push(page);
      },
      handlePageChange(page) {
        this.loading = true;
        this.page = page;
        // this.$router.push({ path: "/products", query: { page: page } });
        this.fetchProducts();
      },
      switchCategory(category) {
        this.$store.dispatch("setActiveTabId", category);
        this.loading = true;
        this.activeTabID = category;
        this.header = category;
        switch (category) {
          case "battery":
            this.header = "batteries";
            break;
          case "inverter":
            this.header = "inverters";
            break;
          case "solar panel":
            this.header = "solar panels";
            break;
          case "accessory":
            this.header = "accessories";
            break;
          case "bundle":
            this.header = "complete solution";
            break;
        }
        this.page = null;
        // this.$router.push({ path: "/products", query: { category: category } });
        this.fetchProducts();
      },
      fetchProducts() {
        this.productsList = [];
        if (this.activeTabID === "all products") {
          api
            .getAllProducts(this.page)
            .then((response) => {
              this.productsList = response.data.data.result;
              this.pagination = response.data.data;
              this.loading = false;

              // if (response.data.data.result.length < 4) {
              //   let emptyProductSpace = 4 - response.data.data.result.length;
              //   let emptyObject = {};
              //   let emptyProductArray = new Array(emptyProductSpace).fill(
              //     emptyObject
              //   );
              //   this.productsList = response.data.data.result.concat(
              //     emptyProductArray
              //   );
              //   this.pagination = response.data.data;
              //   this.loading = false;
              // } else {
              //   this.pagination = response.data.data;
              //   this.productsList = response.data.data.result;
              //   this.loading = false;
              // }
            })
            .catch(({ response }) => {
              alert(response.data.message);
            });
        } else {
          api
            .getProductByCategory(this.activeTabID, this.page)
            .then((response) => {
              this.productsList = response.data.data.result;
              this.pagination = response.data.data;
              this.loading = false;
              // if (response.data.data.result.length < 4) {
              //   let emptyProductSpace = 4 - response.data.data.result.length;
              //   let emptyObject = {};
              //   let emptyProductArray = new Array(emptyProductSpace).fill(
              //     emptyObject
              //   );
              //   this.pagination = response.data.data;
              //   this.productsList = response.data.data.result.concat(
              //     emptyProductArray
              //   );
              //   this.loading = false;
              // } else {
              //   this.pagination = response.data.data;
              //   this.productsList = response.data.data.result;
              //   this.loading = false;
              // }
            })
            .catch(({ response }) => {
              alert(response.data.message);
            });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/scss/products.scss";
</style>
