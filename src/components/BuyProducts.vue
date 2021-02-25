<template>
  <div id="normal-products-section" class="container">
    <section class="header-section">
      <div class="header-text-28 capitalize">{{ this.header }}</div>
      <div class="category-nav">
        <div class="category-link" @click="switchCategory('all products')">
          <div class="category">All Products</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'all products'"
          ></div>
        </div>
        <div class="category-link" @click="switchCategory('solar panel')">
          <div class="category">Solar Panels</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'solar panel'"
          ></div>
        </div>
        <div class="category-link" @click="switchCategory('inverter')">
          <div class="category">Inverters</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'inverter'"
          ></div>
        </div>
        <div class="category-link" @click="switchCategory('battery')">
          <div class="category">Batteries</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'battery'"
          ></div>
        </div>
        <div class="category-link" @click="switchCategory('accessory')">
          <div class="category">Accessories</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'accessory'"
          ></div>
        </div>
        <div
          class="category-link margin-right-none"
          @click="switchCategory('bundle')"
        >
          <div class="category">Complete Solution</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'bundle'"
          ></div>
        </div>
      </div>
      <div class="mobile-category-nav">
        <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
        <select
          name="activeTab"
          id="active-tab"
          v-model="activeTab"
          @input="setCategory"
        >
          <option
            v-for="link in links"
            :key="link.value"
            :label="link.label"
            :value="link.value"
          ></option>
        </select>
      </div>
    </section>

    <section class="products-container" v-if="!loading">
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
          <div class="product-name">{{ product.name | setUppercase }}</div>
          <div class="product-description">
            <p>{{ product.description | shortenString | setUppercase }}</p>
          </div>

          <div class="price">
            ₦ {{ product.price ? product.price.toLocaleString() : "" }}
          </div>
        </div>
      </div>
    </section>

    <content-loader v-else>
      <div class="loader"></div>
    </content-loader>

    <div class="pagination">
      <BackendPagination
        @pageChange="handlePageChange"
        :totalRecord="pagination.totalRecords"
        :currentPage="pagination.page"
        :perPage="pagination.per_page"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import contentLoader from "@/components/contentLoader";
import BackendPagination from "@/components/Pagination/BackendPagination";

export default {
  components: {
    contentLoader,
    BackendPagination,
  },
  data() {
    return {
      header: "all products",
      links: [
        {
          value: "all products",
          label: "All Products",
        },
        {
          value: "solar panel",
          label: "Solar Panel",
        },
        {
          value: "inverter",
          label: "Inverter",
        },
        {
          value: "battery",
          label: "Battery",
        },
        {
          value: "accessory",
          label: "Accessory",
        },
        {
          value: "bundle",
          label: "Complete Solution",
        },
      ],
    };
  },
  created() {
    if (!JSON.parse(localStorage.getItem("active_tab"))) {
      this.switchCategory(this.$store.state.activeTab);
    } else {
      let category = JSON.parse(localStorage.getItem("active_tab"));
      this.switchCategory(category);
    }
  },

  mounted() {},

  computed: {
    productsList: {
      get() {
        return this.$store.state.productModule.productsList;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setProductsList", newValue);
      },
    },
    pagination: {
      get() {
        return this.$store.state.productModule.pagination;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setPagination", newValue);
      },
    },
    loading: {
      get() {
        return this.$store.state.productModule.loading;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setLoading", newValue);
      },
    },
    activeTab: {
      get() {
        return this.$store.state.activeTab;
      },
      set(newValue) {
        return this.$store.dispatch("setActiveTabId", newValue);
      },
    },
  },

  methods: {
    navigateTo(page) {
      if (page.split("/")[2] === "undefined") {
        return;
      }
      this.$router.push(page);
    },
    handlePageChange(page) {
      this.$store.dispatch("productModule/setLoading", true);
      this.$store.dispatch("productModule/setPage", page);
      // this.$router.push({ path: "/products", query: { page: page } });
      this.$store.dispatch("productModule/getAllProducts", {
        page: this.$store.state.productModule.page,
        category: this.$store.state.activeTab,
      });
      this.$router.push({ path: `/products/${page}` });
    },
    switchCategory(category) {
      this.$store.dispatch("productModule/setLoading", true);
      this.$store.dispatch("setActiveTabId", category);
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
      this.$store.dispatch("productModule/setPage", null);
      // this.$router.push({ path: "/products", query: { category: category } });
      this.$store.dispatch("productModule/getAllProducts", {
        page: this.$store.state.productModule.page,
        category: this.$store.state.activeTab,
      });
    },
    setCategory() {
      const category =
        event.target.options[event.target.options.selectedIndex].attributes[2]
          .value;
      this.switchCategory(category);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/products.scss";
</style>
