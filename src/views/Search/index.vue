<template>
  <div id="search" class="container">
    <div class="header-text-28">
      Search results for "{{ $route.params.id }}"
    </div>
    <section class="products-container" v-if="!loading">
      <div
        class="product-item"
        v-for="(product, index) in productList"
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
      <div v-if="show" class="loader"></div>
      <span v-else>{{ contentLoaderText }}</span>
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
    return {
      contentLoaderText: "",
    };
  },
  created() {
    this.$store.dispatch("productModule/searchProducts", {
      query: this.$route.params.id,
    });
  },
  watch: {
    "$route.params.id": {
      handler: function(value) {
        this.$store.dispatch("productModule/searchProducts", {
          query: this.$route.params.id,
        });
      },
      deep: true,
      immediate: true,
    },
    show(value) {
      if (!value) {
        this.contentLoaderText = "Nothing to Show";
      }
    },
  },
  computed: {
    productList: {
      get() {
        return this.$store.state.productModule.productsList;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setProductsList", newValue);
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
    pagination: {
      get() {
        return this.$store.state.productModule.pagination;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setPagination", newValue);
      },
    },
    show: {
      get() {
        return this.$store.state.productModule.show;
      },
      set(newValue) {
        return this.$store.dispatch("productModule/setShow", newValue);
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
      this.$store.dispatch("searchProductModule/setLoading", true);
      this.$store.dispatch("searchProductModule/setPage", page);
      // this.$router.push({ path: "/products", query: { page: page } });
      this.$store.dispatch("searchProductModule/searchProducts", {
        query: this.$route.params.id,
        page: this.$store.state.searchProductModule.page,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#search {
  .header-text-28 {
    font-size: 1.75rem;
    font-weight: 500;
    font-family: HelveticaNeue;
    text-align: center;
    color: #1d1d1d;
  }

  .products-container {
    margin-top: 3.375rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: solid 1px #000000;
    border-right: none;
    border-bottom: none;

    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 0.5rem;
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .product-item {
      display: flex;
      justify-content: center;
      border-right: solid 1px #000000;
      border-bottom: solid 1px black;
      padding-top: 2.125rem;
      cursor: pointer;

      .centered-content {
        width: 85%;

        @media screen and (max-width: 900px) {
          width: 80%;
        }

        animation-name: fadeIn;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
        animation-duration: 1s;
        animation-fill-mode: forwards;

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .image-container {
          // background-color: rgba(99, 155, 97, 0.2);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          height: 15rem;
          padding-bottom: 1.875rem;

          @media screen and (max-width: 900px) {
            height: 10rem;
          }

          img {
            width: 70%;
            position: relative;
            object-position: bottom;
            object-fit: contain;
            max-height: 100%;

            @media screen and (max-width: 900px) {
              width: 60%;
            }
          }
        }

        .product-name {
          font-family: HelveticaNeue;
          font-size: 1.1rem;
          font-weight: 500;
          color: #000000;
          margin-top: 1.5rem;
          margin-bottom: 0.2rem;
          overflow: hidden;
        }

        .product-description {
          font-family: HelveticaNeue;
          font-size: 0.9rem;
          color: #000000;
          font-weight: 500;
          margin-bottom: 0.5rem;
          line-height: 1.4rem;
          opacity: 0.8;
          overflow: hidden;
        }

        .price {
          font-family: Gotham;
          font-size: 1.125rem;
          color: #000000;
          font-weight: 500;
          margin-bottom: 1.375rem;
          letter-spacing: 0.003rem;
          line-height: 1.4rem;
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    margin-top: 2rem;
  }
}
</style>
