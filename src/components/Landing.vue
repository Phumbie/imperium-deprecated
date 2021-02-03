<template>
  <div id="landing" class="container">
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
          <img
            srcset="
              https://res.cloudinary.com/imperiumng/image/upload/v1611900068/v616qqazyeow6bxhwfjc.jpg 2560w,
              https://res.cloudinary.com/imperiumng/image/upload/v1611899874/zgifhqbgzhgeofsjjlyc.jpg 1800w,
              https://res.cloudinary.com/imperiumng/image/upload/v1611899858/qhhsgfzpmsvr6hs13q8m.jpg 1600w,
              https://res.cloudinary.com/imperiumng/image/upload/v1611899837/bqdks7a5qb5gp9xrkp5c.jpg 1536w,
              https://res.cloudinary.com/imperiumng/image/upload/v1611899668/agjcmk8golvk5mcmqono.jpg 1440w,
              https://res.cloudinary.com/imperiumng/image/upload/v1611899606/vh0p9p2ir9myclx38pms.jpg 1336w,
              https://res.cloudinary.com/imperiumng/image/upload/v1611899513/h3r272rxgamuwsuvxskt.jpg 1280w,
              https://res.cloudinary.com/imperiumng/image/upload/v1611899313/ro2sedoqsyqvwut9of5j.jpg 1080w
            "
            src="https://res.cloudinary.com/imperiumng/image/upload/v1611899209/hnam1ivshxvivcnoimhe.jpg"
            loading="lazy"
            sizes="(max-width: 600px) 100vw"
            alt="installation image"
          />
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
    this.$store.dispatch("productModule/getSimilarProducts", {
      category: "solar panel",
      per_page: 100000,
    });
    this.$store.dispatch("productModule/getSimilarProducts", {
      category: "inverter",
      per_page: 100000,
    });
    this.$store.dispatch("productModule/getSimilarProducts", {
      category: "battery",
      per_page: 100000,
    });
    this.$store.dispatch("productModule/getSimilarProducts", {
      category: "bundle",
      per_page: 100000,
    });
  },
  mounted() {},
  computed: {
    batteries: {
      get() {
        return this.$store.state.productModule.batteries;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setBatteries", newValue);
      },
    },
    inverters: {
      get() {
        return this.$store.state.productModule.inverters;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setInverters", newValue);
      },
    },
    panels: {
      get() {
        return this.$store.state.productModule.panels;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setPanels", newValue);
      },
    },
    bundles: {
      get() {
        return this.$store.state.productModule.bundles;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setBundles", newValue);
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
  },
  methods: {
    navigateTo(page) {
      if (page.split("/")[2] === "undefined") {
        return;
      }
      this.$router.push(page);
    },
    setActiveTab(activeTabID) {
      this.$store.dispatch("productModule/setLoading", true);
      this.$store.dispatch("setActiveTabId", activeTabID);
      this.$router.push({ path: "/products/1" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/landing.scss";
</style>
