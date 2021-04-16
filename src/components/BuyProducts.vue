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
        <div class="category-link" @click="switchCategory('bundle')">
          <div class="category">Complete Solution</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'bundle'"
          ></div>
        </div>
        <div
          class="category-link margin-right-none"
          @click="switchCategory('package')"
        >
          <div class="category">Special offer</div>
          <div
            class="underline"
            v-if="this.$store.state.activeTab == 'package'"
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
          <div class="product-description" v-if="product.description">
            <p>{{ product.description | shortenString | setUppercase }}</p>
          </div>
          <div
            class="product-description"
            v-if="product.components.MPPT_controller"
          >
            <p>
              Solar PV:
              {{ product.components.solar_PV | shortenString | setUppercase }}
            </p>
            <p>
              Inverter:
              {{
                product.components.battery_inverter
                  | shortenString
                  | setUppercase
              }}
            </p>
          </div>

          <div class="price">
            ₦
            {{
              product.total_price
                ? product.total_price.toLocaleString()
                : product.price.toLocaleString()
            }}
          </div>
          <!-- <ul class="location">
            <li
              v-for="(location, index) in product.vendor_location"
              :key="index"
            >
              {{ location | setUppercase }}
            </li>
          </ul> -->
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
import { mapState, mapActions } from "vuex";
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
        {
          value: "package",
          label: "Special offer",
        },
      ],
    };
  },
  created() {
    if (!JSON.parse(localStorage.getItem("active_tab"))) {
      this.switchCategory(this.activeTab);
    } else {
      let category = JSON.parse(localStorage.getItem("active_tab"));
      this.switchCategory(category);
    }
  },

  mounted() {},

  computed: {
    ...mapState({
      loading: (state) => state.productModule.loading,
      activeTab: (state) => state.activeTab,
      productsList: (state) => state.productModule.productsList,
      pagination: (state) => state.productModule.pagination,
      page: (state) => state.productModule.page,
    }),
  },

  methods: {
    ...mapActions("productModule", ["setLoading", "setPage", "getAllProducts"]),
    ...mapActions(["setActiveTabId"]),
    navigateTo(page) {
      if (page.split("/")[2] === "undefined") {
        return;
      }
      this.$router.push(page);
    },
    handlePageChange(page) {
      this.setLoading(true);
      this.setPage(page);
      this.getAllProducts({
        page: this.page,
        category: this.activeTab,
      });
      this.$router.push({ path: `/products/${page}` });
    },
    switchCategory(category) {
      this.setLoading(true);
      this.setActiveTabId(category);
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
        case "package":
          this.header = "packages";
          break;
      }
      this.setPage(null);
      this.getAllProducts({
        page: this.page,
        category: this.activeTab,
      });
    },
    setCategory(event) {
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
