<template>
  <div id="landing">
    <div v-if="!loading">
      <div class="header-text-28">
        Power your home with our range of products
      </div>
      <div class="small-text">
        Solar Panels and Inverters
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
            <div class="small-text-18 truncate-name">{{ panel.name }}</div>
            <div class="small-gray-text truncate-description">
              {{ panel.description }} KV
            </div>
            <div class="small-gray-text">
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
            <div class="small-text-18 truncate-name">{{ inverter.name }}</div>
            <div class="small-gray-text truncate-description">
              {{ inverter.description }} KV
            </div>
            <div class="small-gray-text">
              ₦ {{ inverter.price ? inverter.price.toLocaleString() : "" }}
            </div>
          </div>
        </div>
      </div>
      <div class="product-footer" v-if="!loading">
        <router-link to="/products" class="product-footer__link"
          >Shop Panels</router-link
        >
        <router-link to="/products" class="product-footer__link"
          >Shop Inverters</router-link
        >
      </div>
      <div class="landing-img-section">
        <div class="header-text-28 margin-bottom">
          Going Green
        </div>
        <div class="small-text">
          Transition to renewable energy with our complete solutions in order to
          reduce your carbon footprint
        </div>
        <div class="image-div">
          <img src="~@/assets/images/landing1.jpg" />
        </div>
      </div>
      <div class="small-text">
        Batteries and Complete Solution
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
            <div class="small-text-18 truncate-name">{{ battery.name }}</div>
            <div class="small-gray-text truncate-description">
              {{ battery.description }} KV
            </div>
            <div class="small-gray-text">
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
            <div class="small-text-18 truncate-name">{{ bundle.name }}</div>
            <div class="small-gray-text truncate-description">
              {{ bundle.description }} KV
            </div>
            <div class="small-gray-text">
              ₦ {{ bundle.price ? bundle.price.toLocaleString() : "" }}
            </div>
          </div>
        </div>
      </div>
      <div class="product-footer" v-if="!loading">
        <router-link to="/products" class="product-footer__link"
          >Shop Batteries</router-link
        >
        <router-link to="/products" class="product-footer__link"
          >Complete Solutions</router-link
        >
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
  components: {
    contentLoader
  },
  data() {
    return {
      batteries: [],
      inverters: [],
      panels: [],
      bundles: [],
      loading: true,
      activeTabID: "all products",
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
    fetchProducts() {
      this.batteries = [];
      this.inverters = [];
      this.panels = [];
      this.bundles = [];
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
        .getSimilarProducts("bundle", 100000)
        .then(response => {
          if (response.data.data.result.length < 2) {
            let emptyProductSpace = 2 - response.data.data.result.length;
            let emptyObject = {};
            let emptyProductArray = new Array(emptyProductSpace).fill(
              emptyObject
            );
            this.bundles = shuffleArray(response.data.data.result).concat(
              emptyProductArray
            );
            this.loading = false;
          } else {
            this.bundles = shuffleArray(response.data.data.result).slice(-2);
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
.margin-bottom {
  margin-bottom: 0;
}

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

.product-footer {
  width: 100%;
  display: flex;
  border-left: 1px solid #1d1d1d;

  &__link {
    width: 51%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #1d1d1d;
    border-bottom: 1px solid #1d1d1d;
    text-decoration: none;
    color: #1d1d1d;
    font-size: 1.4rem;
    padding: 1rem;
    transition: 0.5s ease-in-out;
  }

  &__link:hover {
    background: #1b1b1b;
    color: white;
  }
}

.landing-img-section {
  width: 100%;
  margin: 5rem 0;

  .image-div {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      position: relative;
      object-position: center;
      object-fit: contain;
      padding: 1rem;
    }
  }
}
</style>
