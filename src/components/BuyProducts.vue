<template>
  <div id="normal-products-section">
    <div class="header-text-28 capitalize">{{ this.header }}</div>
    <div class="nav-desc-conf-set">
      <div class="nav-link" @click="switchCategory('all products')">
        <div class="nav-desc-conf-set__item">All Products</div>
        <div class="line-black" v-if="this.activeTabID == 'all products'"></div>
      </div>
      <div class="nav-link" @click="switchCategory('battery')">
        <div class="nav-desc-conf-set__item">Batteries</div>
        <div class="line-black" v-if="this.activeTabID == 'battery'"></div>
      </div>
      <div class="nav-link" @click="switchCategory('inverter')">
        <div class="nav-desc-conf-set__item">Inverters</div>
        <div class="line-black" v-if="activeTabID == 'inverter'"></div>
      </div>
      <div class="nav-link" @click="switchCategory('solar panel')">
        <div class="nav-desc-conf-set__item">Solar Panels</div>
        <div class="line-black" v-if="activeTabID == 'solar panel'"></div>
      </div>
      <div class="nav-link" @click="switchCategory('accessory')">
        <div class="nav-desc-conf-set__item">Accessories</div>
        <div class="line-black" v-if="activeTabID == 'accessory'"></div>
      </div>

      <div class="nav-link margin-right-none" @click="switchCategory('bundle')">
        <div class="nav-desc-conf-set__item">Complete Solution</div>
        <div class="line-black" v-if="activeTabID == 'bundle'"></div>
      </div>
    </div>
    <div class="products-container" v-if="!loading">
      <div
        class="product-item"
        v-for="(product, index) in productsList"
        :key="index"
        @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
      >
        <div class="centered-content" v-if="product.price">
          <div class="image-container">
            <img :src="product.display_image" />
          </div>
          <div class="small-text-18 truncate-name">{{ product.name }}</div>
          <div class="small-gray-text truncate-description">
            {{ product.description }} KV
          </div>
          <div class="small-gray-text">
            ₦ {{ product.price ? product.price.toLocaleString() : "" }}
          </div>
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div class="loader"></div>
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
  </div>
</template>

<script>
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader";

export default {
  components: {
    contentLoader
  },
  data() {
    return {
      productsList: [],
      pagination: "",
      loading: true,
      activeTabID: "all products",
      header: "all products",
      page: 1
    };
  },
  mounted() {
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
      this.$router.push({ path: "/products", query: { page: page } });
      this.fetchProducts();
    },
    switchCategory(category) {
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
      this.$router.push({ path: "/products", query: { category: category } });
      this.fetchProducts();
    },
    fetchProducts() {
      this.productsList = [];
      if (this.activeTabID === "all products") {
        api
          .getAllProducts(this.page)
          .then(response => {
            if (response.data.data.result.length < 4) {
              let emptyProductSpace = 4 - response.data.data.result.length;
              let emptyObject = {};
              let emptyProductArray = new Array(emptyProductSpace).fill(
                emptyObject
              );
              this.productsList = response.data.data.result.concat(
                emptyProductArray
              );
              this.pagination = response.data.data;
              this.loading = false;
            } else {
              this.pagination = response.data.data;
              this.productsList = response.data.data.result;
              this.loading = false;
            }
          })
          .catch(({ response }) => {
            alert(response.data.message);
          });
      } else {
        api
          .getProductByCategory(this.activeTabID, this.page)
          .then(response => {
            if (response.data.data.result.length < 4) {
              let emptyProductSpace = 4 - response.data.data.result.length;
              let emptyObject = {};
              let emptyProductArray = new Array(emptyProductSpace).fill(
                emptyObject
              );
              this.pagination = response.data.data;
              this.productsList = response.data.data.result.concat(
                emptyProductArray
              );
              this.loading = false;
            } else {
              this.pagination = response.data.data;
              this.productsList = response.data.data.result;
              this.loading = false;
            }
          })
          .catch(({ response }) => {
            alert(response.data.message);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.truncate-name {
  display: -webkit-box;
  height: 2rem;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.truncate-description {
  display: -webkit-box;
  height: 2.6rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
