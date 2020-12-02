<template>
  <div id="landing">
    <div v-if="!loading">
      <section class="top-section">
        <div>
          <p class="header-text-28">
            Power your home with our range of products
          </p>
          <p class="small-text">Solar Panels and Inverters</p>
        </div>
        <div class="products-container">
          <div
            class="product-item"
            v-for="panel in panels"
            :key="panel.id"
            @click="navigateTo(`/product/${panel.slug}/id/${panel.id}`)"
          >
            <div class="centered-content" v-if="panel.price">
              <div class="image-container">
                <img :src="panel.display_image" />
              </div>
              <div class="product-name">{{ panel.name | setUppercase }}</div>
              <div class="product-description">
                <p>{{ panel.description | shortenString | setUppercase }}</p>
              </div>
              <div class="price">
                ₦ {{ panel.price ? panel.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
          <div
            class="product-item"
            v-for="inverter in inverters"
            :key="inverter.id"
            @click="navigateTo(`/product/${inverter.slug}/id/${inverter.id}`)"
          >
            <div class="centered-content" v-if="inverter.price">
              <div class="image-container">
                <img :src="inverter.display_image" />
              </div>
              <div class="product-name">{{ inverter.name | setUppercase }}</div>
              <div class="product-description">
                <p>{{ inverter.description | shortenString | setUppercase }}</p>
              </div>
              <div class="price">
                ₦ {{ inverter.price ? inverter.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
          <div class="product-footer" v-if="!loading">
            <div
              class="product-footer__link"
              @click="setActiveTab('solar panel')"
            >
              Shop Panels
            </div>
          </div>
          <div class="product-footer footer-right" v-if="!loading">
            <div
              to="/products"
              class="product-footer__link"
              @click="setActiveTab('inverter')"
            >
              Shop Inverters
            </div>
          </div>
        </div>
      </section>
      <section class="middle-section">
        <div class="header-text-28 margin-bottom">
          Going Green
        </div>
        <div>
          <p class="small-text">
            Transition to renewable energy with our complete solutions in order
            to
          </p>
          <p class="small-text">reduce your carbon footprint</p>
        </div>
        <div class="image" @click="setActiveTab('bundle')">
          <img src="~@/assets/images/landing1.jpg" />
        </div>
      </section>
      <section class="bottom-section">
        <div>
          <p class="header-text-28">
            Power your home with our range of products
          </p>
          <p class="small-text">Batteries and Accessories</p>
        </div>
        <div class="products-container">
          <div
            class="product-item"
            v-for="battery in batteries"
            :key="battery.id"
            @click="navigateTo(`/product/${battery.slug}/id/${battery.id}`)"
          >
            <div class="centered-content" v-if="battery.price">
              <div class="image-container">
                <img :src="battery.display_image" />
              </div>
              <div class="product-name">{{ battery.name | setUppercase }}</div>
              <div class="product-description">
                <p>{{ battery.description | shortenString | setUppercase }}</p>
              </div>

              <div class="price">
                ₦ {{ battery.price ? battery.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
          <div
            class="product-item"
            v-for="bundle in bundles"
            :key="bundle.id"
            @click="navigateTo(`/product/${bundle.slug}/id/${bundle.id}`)"
          >
            <div class="centered-content" v-if="bundle.price">
              <div class="image-container">
                <img :src="bundle.display_image" />
              </div>
              <div class="product-name">
                {{ bundle.name | setUppercase }}
              </div>
              <div class="product-description">
                <p>
                  {{ bundle.description | shortenString | setUppercase }}
                </p>
              </div>
              <div class="price">
                ₦ {{ bundle.price ? bundle.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
          <div class="product-footer" v-if="!loading">
            <div class="product-footer__link" @click="setActiveTab('battery')">
              Shop Batteries
            </div>
          </div>
          <div class="product-footer footer-right" v-if="!loading">
            <div class="product-footer__link" @click="setActiveTab('bundle')">
              Complete Solution
            </div>
          </div>
        </div>
      </section>
    </div>
    <content-loader v-else>
      <div class="loader"></div>
    </content-loader>
  </div>
</template>

<script>
import contentLoader from "@/components/contentLoader";

export default {
  components: {
    contentLoader,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getSimilarProducts", {
      category: "solar panel",
      per_page: 100000,
    });
    this.$store.dispatch("getSimilarProducts", {
      category: "inverter",
      per_page: 100000,
    });
    this.$store.dispatch("getSimilarProducts", {
      category: "battery",
      per_page: 100000,
    });
    this.$store.dispatch("getSimilarProducts", {
      category: "bundle",
      per_page: 100000,
    });
  },
  mounted() {},
  computed: {
    batteries: {
      get() {
        return this.$store.state.batteries;
      },
      set(newValue) {
        return this.$store.dispatch("setBatteries", newValue);
      },
    },
    inverters: {
      get() {
        return this.$store.state.inverters;
      },
      set(newValue) {
        return this.$store.dispatch("setInverters", newValue);
      },
    },
    panels: {
      get() {
        return this.$store.state.panels;
      },
      set(newValue) {
        return this.$store.dispatch("setPanels", newValue);
      },
    },
    bundles: {
      get() {
        return this.$store.state.bundles;
      },
      set(newValue) {
        return this.$store.dispatch("setBundles", newValue);
      },
    },
    loading: {
      get() {
        return this.$store.state.loading;
      },
      set(newValue) {
        return this.$store.dispatch("setLoading", newValue);
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
    setActiveTab(activeTabID) {
      this.$store.dispatch("setActiveTabId", activeTabID);
      this.$router.push({ path: "/products" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/landing.scss";
</style>
