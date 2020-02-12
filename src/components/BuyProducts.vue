<template>
  <div id="normal-products-section">
    <div class="header-text-28">Power your home with our range of products</div>
    <div class="small-text">
      Find batteries, inverters, solar panels and more
    </div>
    <div class="bat-inv-pan-acc">
      <div class="nav-link" @click="activeTabID = 0">
        <span class="bat-inv-pan-acc__item">
          Batteries
          <div class="line-black" v-if="activeTabID == 0"></div>
        </span>
      </div>
      <div class="nav-link" @click="activeTabID = 1">
        <span class="bat-inv-pan-acc__item">
          Inverters
          <div class="line-black" v-if="activeTabID == 1"></div>
        </span>
      </div>
      <div class="nav-link" @click="activeTabID = 2">
        <span class="bat-inv-pan-acc__item">
          Panels
          <div class="line-black" v-if="activeTabID == 2"></div>
        </span>
      </div>
      <div class="nav-link" @click="activeTabID = 3">
        <span class="bat-inv-pan-acc__item">
          Accesories
          <div class="line-black" v-if="activeTabID == 3"></div>
        </span>
      </div>
    </div>
    <div class="long-details" v-if="activeTabID == 0">
      <div class="products-container" v-if="fetchedProducts">
        <div
          class="product-item"
          v-for="(product, index) in productsList"
          :key="index"
          @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
        >
          <div class="centered-content">
            <div class="image-container">
              <img :src="product.display_image" />
            </div>
            <div class="small-text-18">{{ product.name }}</div>
            <div class="small-gray-text text-blue">
              ₦{{ product.price.toLocaleString() }}
            </div>
            <div class="small-gray-text text-blue">
              {{ product.capacity }} KV
            </div>
          </div>
        </div>
      </div>
      <content-loader v-else>
        <div class="loader"></div>
      </content-loader>
    </div>
    <div class v-if="activeTabID == 0">
      <paginate
        v-model="page"
        :page-count="2"
        :click-handler="changePage"
        :prev-text="'Previous Page'"
        :next-text="'Next Page'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :next-class="'page-item'"
        :prev-class="'page-item'"
      />
    </div>
    <div class="long-details" v-if="activeTabID == 1">
      <div class="products-container" v-if="fetchedProducts">
        <div
          class="product-item"
          v-for="(product, index) in productsList"
          :key="index"
          @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
        >
          <div class="centered-content">
            <div class="image-container">
              <img :src="product.display_image" />
            </div>
            <div class="small-text-18">{{ product.name }}</div>
            <div class="small-gray-text text-blue">
              ₦{{ product.price.toLocaleString() }}
            </div>
            <div class="small-gray-text text-blue">
              {{ product.capacity }} KV
            </div>
          </div>
        </div>
      </div>
      <content-loader v-else>
        <div class="loader"></div>
      </content-loader>
    </div>
    <div class v-if="activeTabID == 1">
      <paginate
        v-model="page"
        :page-count="2"
        :click-handler="changePage"
        :prev-text="'Previous Page'"
        :next-text="'Next Page'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :next-class="'page-item'"
        :prev-class="'page-item'"
      />
    </div>
    <div class="long-details" v-if="activeTabID == 2">
      <div class="products-container" v-if="fetchedProducts">
        <div
          class="product-item"
          v-for="(product, index) in productsList"
          :key="index"
          @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
        >
          <div class="centered-content">
            <div class="image-container">
              <img :src="product.display_image" />
            </div>
            <div class="small-text-18">{{ product.name }}</div>
            <div class="small-gray-text text-blue">
              ₦{{ product.price.toLocaleString() }}
            </div>
            <div class="small-gray-text text-blue">
              {{ product.capacity }} KV
            </div>
          </div>
        </div>
      </div>
      <content-loader v-else>
        <div class="loader"></div>
      </content-loader>
    </div>
    <div class v-if="activeTabID == 2">
      <paginate
        v-model="page"
        :page-count="2"
        :click-handler="changePage"
        :prev-text="'Previous Page'"
        :next-text="'Next Page'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :next-class="'page-item'"
        :prev-class="'page-item'"
      />
    </div>
    <div class="long-details" v-if="activeTabID == 3">
      <div class="products-container" v-if="fetchedProducts">
        <div
          class="product-item"
          v-for="(product, index) in productsList"
          :key="index"
          @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
        >
          <div class="centered-content">
            <div class="image-container">
              <img :src="product.display_image" />
            </div>
            <div class="small-text-18">{{ product.name }}</div>
            <div class="small-gray-text text-blue">
              ₦{{ product.price.toLocaleString() }}
            </div>
            <div class="small-gray-text text-blue">
              {{ product.capacity }} KV
            </div>
          </div>
        </div>
      </div>
      <content-loader v-else>
        <span>
          <div class="loader"></div>
        </span>
      </content-loader>
    </div>
    <div class v-if="activeTabID == 3">
      <paginate
        v-model="page"
        :page-count="2"
        :click-handler="changePage"
        :prev-text="'Previous Page'"
        :next-text="'Next Page'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :next-class="'page-item'"
        :prev-class="'page-item'"
      />
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
      fetchedProducts: false,
      activeTabID: 0,
      page: 1
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    fetchProducts() {
      api
        .getAllProducts(this.page)
        .then(({ data }) => {
          this.productsList = data.data.result;
          this.fetchedProducts = true;
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    changePage(page) {
      this.page = page;
      this.fetchProducts();
    }
  }
};
</script>

<style lang="scss" scoped></style>
