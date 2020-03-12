<template>
  <div id="nav-container">
    <section class="top-section">
      <router-link to="/my-account" class="nav-item">Account</router-link>
      <router-link to="/" class="product-title">Imperium</router-link>
      <router-link to="/cart" class="nav-item"
        >Shopping cart ({{
          cartCounter === 0 ? "0" : cartCounter
        }})</router-link
      >
    </section>
    <section class="bottom-section">
      <a
        href="https://calculator.imperiumng.com/"
        target="_blank"
        class="nav-item1"
        >Energy Calculator</a
      >
      <a
        href="https://calculator.imperiumng.com/request-audit/"
        target="_blank"
        class="nav-item2"
        >Request Audit</a
      >
      <router-link to="/products" class="nav-item3">Buy Products</router-link>
      <a
        class="nav-item4"
        href="https://www.imperiumng.com/blog"
        target="_blank"
        >Blog</a
      >
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/utils/api.js";

export default {
  name: "TopNav",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartCounter"])
  },
  mounted() {
    this.setCartCounter();
  },
  methods: {
    setCartCounter() {
      if (
        !localStorage.getItem("user_details") &&
        !localStorage.getItem("product_id")
      ) {
        let details = [];
        let localCart = [];
        let cartSize = 0;
        localStorage.setItem("product_id", JSON.stringify(details));
        localStorage.setItem("local_cart", JSON.stringify(localCart));

        this.$store.dispatch("setCartCounter", cartSize);
        return;
      }
      if (
        !localStorage.getItem("user_details") &&
        JSON.parse(localStorage.getItem("product_id"))
      ) {
        let cartSize = 0;
        JSON.parse(localStorage.getItem("product_id")).map(item => {
          cartSize += item.quantity;
        });
        this.$store.dispatch("setCartCounter", cartSize);
        return;
      }
      api
        .getCart()
        .then(({ data }) => {
          if (data.status == "success") {
            let cartSize = 0;
            let cartItems = data.data.cart.items;
            cartItems.forEach(item => {
              cartSize += item.quantity;
            });
            this.$store.dispatch("setCartCounter", cartSize);
          }
        })
        .catch(({ response }) => {
          if (response) {
            alert(response.data.message);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#nav-container {
  border: solid 0.0625rem #000000;
  width: 100%;
  background: white;
  border-right: none;
  border-bottom: none;
  position: sticky;
  position: -webkit-sticky;
  margin: 38px 0;
  top: 0;
  z-index: 10;

  .top-section {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    border-bottom: solid 0.0625rem #000000;
  }

  .bottom-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: solid 0.0625rem #000000;
    border-top: none;
  }

  .product-title {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-right: solid 0.0625rem #000000;
    font-size: 2rem;
    text-decoration: none;
    padding: 0.6rem 0;
    color: #1d1d1d;
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: solid 0.0625rem #000000;
    padding: 15px 0;
    text-align: center;
    color: black;
  }

  .nav-item1,
  .nav-item2,
  .nav-item3,
  .nav-item4 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    text-align: center;
    color: black;
    border-right: solid 0.0625rem #000000;
  }

  .nav-item,
  .nav-item1,
  .nav-item2,
  .nav-item3,
  .nav-item4 {
    flex: 1;
    font-size: 1.125rem;
    background: white;
    padding: 1.2rem 0;
    text-align: center;
    text-decoration: none;
    color: #1d1d1d;
    transition: 0.5s;
    cursor: pointer;
  }

  .nav-item:hover,
  .nav-item1:hover,
  .nav-item2:hover,
  .nav-item3:hover,
  .nav-item4:hover {
    background: #000000;
    color: white;
    transition: 0.5s;
  }
}
</style>
