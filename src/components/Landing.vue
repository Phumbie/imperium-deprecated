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
          <!-- <SingleProduct  v-for="panel in panels" :key="panel.id" :product="panel" /> -->
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
              <div class="product-name">{{ panel.name }}</div>
              <div class="product-capacity">{{ panel.description | shortenString }}</div>
              <div class="price">
                ₦ {{ panel.price ? panel.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
          <!-- <single-product v-for="inverter in inverters" :key="inverter.id"  :product="inverter"/> -->
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
              <div class="product-name">{{ inverter.name }}</div>
              <div class="product-capacity">{{ inverter.description | shortenString }}</div>
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
              <div class="product-name">{{ battery.name }}</div>
              <div class="product-capacity">{{ battery.description  | shortenString  }}</div>
              <div class="price">
                ₦ {{ battery.price ? battery.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
          <div
            class="product-item"
            v-for="accessory in accessories"
            :key="accessory.id"
            @click="navigateTo(`/product/${accessory.slug}/id/${accessory.id}`)"
          >
            <div class="centered-content" v-if="accessory.price">
              <div class="image-container">
                <img :src="accessory.display_image" />
              </div>
              <div class="product-name">{{ accessory.name }}</div>
              <div class="product-capacity">{{ accessory.description | shortenString }}</div>
              <div class="price">
                ₦ {{ accessory.price ? accessory.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
          <div class="product-footer" v-if="!loading">
            <div class="product-footer__link" @click="setActiveTab('battery')">
              Shop Batteries
            </div>
          </div>
          <div class="product-footer footer-right" v-if="!loading">
            <div
              class="product-footer__link"
              @click="setActiveTab('accessory')"
            >
              Accessories
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
import api from "@/utils/api.js";
import shuffleArray from "@/utils/shuffleArray.js";
import contentLoader from "@/components/contentLoader";

export default {
  components: {
    contentLoader,
  },
  data() {
    return {
      batteries: [],
      inverters: [],
      panels: [],
      accessories: [],
      loading: true,
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
    setActiveTab(activeTabID) {
      this.$store.dispatch("setActiveTabId", activeTabID);
      this.$router.push({ path: "/products" });
    },
    fetchProducts() {
      this.batteries = [];
      this.inverters = [];
      this.panels = [];
      this.accessories = [];
      api.getSimilarProducts("solar panel", 100000).then(response => {
        if (response.data.data.result.length < 2) {
          let emptyProductSpace = 2 - response.data.data.result.length;
          let emptyObject = {};
          let emptyProductArray = new Array(emptyProductSpace).fill(
            emptyObject
          );
          this.panels = shuffleArray(response.data.data.result).concat(
            emptyProductArray
          );
          this.loading = false;
        } else {
          this.panels = shuffleArray(response.data.data.result).slice(-2);
          this.loading = false;
        }
      });
      api.getSimilarProducts("inverter", 100000).then(response => {
        if (response.data.data.result.length < 2) {
          let emptyProductSpace = 2 - response.data.data.result.length;
          let emptyObject = {};
          let emptyProductArray = new Array(emptyProductSpace).fill(
            emptyObject
          );
          this.inverters = shuffleArray(response.data.data.result).concat(
            emptyProductArray
          );
          this.loading = false;
        } else {
          this.inverters = shuffleArray(response.data.data.result).slice(-2);
          this.loading = false;
        }
      });
      api.getSimilarProducts("battery", 100000).then(response => {
        if (response.data.data.result.length < 2) {
          let emptyProductSpace = 2 - response.data.data.result.length;
          let emptyObject = {};
          let emptyProductArray = new Array(emptyProductSpace).fill(
            emptyObject
          );
          this.batteries = shuffleArray(response.data.data.result).concat(
            emptyProductArray
          );
          this.loading = false;
        } else {
          this.batteries = shuffleArray(response.data.data.result).slice(-2);
          this.loading = false;
        }
      });
      api
        .getSimilarProducts("accessory", 100000)
        .then(response => {
          if (response.data.data.result.length < 2) {
            let emptyProductSpace = 2 - response.data.data.result.length;
            let emptyObject = {};
            let emptyProductArray = new Array(emptyProductSpace).fill(
              emptyObject
            );
            this.accessories = shuffleArray(response.data.data.result).concat(
              emptyProductArray
            );
            this.loading = false;
          } else {
            this.accessories = shuffleArray(response.data.data.result).slice(
              -2
            );
            this.loading = false;
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/landing.scss";
</style>
