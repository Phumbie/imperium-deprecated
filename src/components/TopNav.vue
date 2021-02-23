<template>
  <div id="nav-container" class="container">
    <section class="top-section" ref="topSection">
      <p
        class="nav-item border-left desktop-view"
        v-if="search"
        @click="showSearch"
      >
        Search
      </p>
      <Search
        class="nav-item border-left desktop-view"
        @toggleFocus="search = !search"
        v-else
      />
      <div class="mobile-nav-item breadcrumb border-left">
        <input type="checkbox" class="toggler" ref="checkBox" @click="toggle" />
        <div class="hamburger"><div></div></div>
      </div>
      <div class="title-container">
        <router-link to="/" class="product-title">Imperium</router-link>
      </div>
      <router-link to="/cart" class="nav-item cart border-right desktop-view"
        >Shopping cart ({{
          cartCounter === 0 ? "0" : cartCounter
        }})</router-link
      >
      <router-link to="/cart" class="mobile-nav-item border-right">
        <img src="@/assets/images/shopping-cart.svg" alt="" />({{
          cartCounter === 0 ? "0" : cartCounter
        }})</router-link
      >
    </section>
    <section class="bottom-section">
      <router-link to="/calculator" class="nav-item1 border-left">
        Energy Calculator
      </router-link>
      <router-link to="/login" class="nav-item2" v-if="!userDetail"
        >Account</router-link
      >
      <router-link to="/my-account/1" class="nav-item2" v-else
        >Hi, {{ userDetail | setUppercase }}</router-link
      >
      <router-link to="/products/1" class="nav-item3">Buy Products</router-link>
      <router-link to="/request-audit" class="nav-item4">Buy Power</router-link>
    </section>
    <section class="mobile-bottom-section">
      <p class="mobile-nav-item1" v-if="search" @click="showSearch">Search</p>
      <Search class="mobile-nav-item1" @toggleFocus="closeNav" v-else />
      <router-link to="/login" class="mobile-nav-item2" v-if="!userDetail"
        >Account</router-link
      >
      <router-link to="/my-account/1" class="mobile-nav-item2" v-else
        >Hi, {{ userDetail | setUppercase }}</router-link
      >
      <router-link to="/calculator" class="mobile-nav-item3">
        Energy Calculator
      </router-link>
      <router-link to="/products/1" class="mobile-nav-item4"
        >Buy Products</router-link
      >
      <router-link to="/request-audit" class="mobile-nav-item5"
        >Buy Power</router-link
      >
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import api from "@/utils/api.js";
import gsap from "@/utils/gsap.js";
import Search from "@/components/Search/Search";
export default {
  name: "TopNav",
  components: { Search },
  data() {
    return {
      requestAuditURL: process.env.VUE_APP_REQUEST_AUDIT_URL,
      calculatorURL: process.env.VUE_APP_CALCULATOR_URL,
      presentScrollPosition: "",
      checkBoxStatus: false,
      userDetail: "",
      search: true,
    };
  },
  created() {
    window.addEventListener("scroll", this.topNavAnimation);
  },
  destroyed() {
    window.removeEventListener("scroll", this.topNavAnimation);
  },
  computed: {
    ...mapGetters(["cartCounter"]),
  },
  mounted() {
    this.topNavAnimation();
    this.setCartCounter();
    this.getUser();
  },
  methods: {
    ...mapActions("notificationModule", ["showModal"]),
    showSearch() {
      this.search = !this.search;
    },
    closeNav() {
      this.search = !this.search;
      this.$refs.checkBox.checked = false;
      this.toggle();
    },
    topNavAnimation() {
      const topSection = this.$refs.topSection;
      const topSectionTop = topSection.getBoundingClientRect().top;
      const topSectionBottom = topSection.getBoundingClientRect().bottom;
      const height = topSectionBottom - topSectionTop;
      if (topSectionTop < 1) {
        gsap.gsapClass().to(".bottom-section", {
          y: -height - 0.5,
          duration: 0.2,
          ease: "Power0.easeInOut",
        });
      } else {
        gsap.gsapClass().to(".bottom-section", {
          y: -1,
          duration: 0.2,
          ease: "Power0.easeInOut",
        });
      }
    },
    toggle() {
      if (this.$refs.checkBox.checked === true) {
        gsap.toggleAnimation(".mobile-bottom-section", "grid", 1, 0.3);
      } else {
        gsap.toggleAnimation(".mobile-bottom-section", "none", 0, 0.1);
      }
    },
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
        JSON.parse(localStorage.getItem("product_id")).map((item) => {
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
            cartItems.forEach((item) => {
              cartSize += item.quantity;
            });
            this.$store.dispatch("setCartCounter", cartSize);
          }
        })
        .catch(({ response }) => {
          if (response) {
            this.showModal({
              description: "Unauthorized account.",
              display: true,
              type: "error",
            });
            localStorage.clear();
            this.setCartCounter();
            this.$router.push("/products");
          }
        });
    },
    getUser() {
      if (localStorage.getItem("user_details")) {
        this.userDetail = JSON.parse(
          localStorage.getItem("user_details")
        ).customer.first_name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#nav-container {
  border-right: none;
  border-left: none;
  border-bottom: none;
  position: sticky;
  position: -webkit-sticky;
  margin: 38px auto;
  top: -1px;
  z-index: 10;
  .top-section {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    border-top: solid 1px #000000;
    @media screen and (max-width: 900px) {
      grid-template-columns: 1fr 4fr 1fr;
    }
    .breadcrumb {
      font-size: 14px;
      z-index: 100;
      .toggler {
        z-index: 300;
        cursor: pointer;
        width: 1.4rem;
        height: 1.2rem;
        opacity: 0;
      }
      .hamburger {
        position: absolute;
        z-index: 200;
        cursor: pointer;
        width: 2rem;
        padding: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      // hamburger line
      .hamburger > div {
        position: relative;
        width: 80%;
        height: 0.1rem;
        background-color: black;
        opacity: 0.6;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s ease;
      }
      .hamburger > div:before,
      .hamburger > div:after {
        content: "";
        position: absolute;
        top: -0.5rem;
        width: 100%;
        height: 0.1rem;
        z-index: 200;
        background-color: black;
        opacity: 0.6;
      }
      .hamburger > div:after {
        top: 0.5rem;
      }
      .toggler:checked + .hamburger > div {
        transform: rotate(135deg);
      }
      .toggler:checked + .hamburger > div:before,
      .toggler:checked + .hamburger > div:after {
        top: 0;
        transform: rotate(90deg);
      }
    }
    .mobile-nav-item {
      display: none;
      @media screen and (max-width: 900px) {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: white;
        color: black;
        border-bottom: solid 1px #000000;
        text-decoration: none;
        z-index: 100;
      }
    }
  }
  .bottom-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: none;
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  .mobile-bottom-section {
    display: none;
    @media screen and (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      border: solid 1px #000000;
      border-top: none;
      background: white;

      .mobile-nav-item1,
      .mobile-nav-item2,
      .mobile-nav-item3,
      .mobile-nav-item4,
      .mobile-nav-item5 {
        border-bottom: solid 1px #000000;
        padding: 14px;
        text-align: center;
        text-decoration: none;
        color: #1d1d1d;
      }
      .mobile-nav-item1 {
        grid-column-start: 1;
        grid-column-end: 3;
      }
      .mobile-nav-item3,
      .mobile-nav-item5 {
        border-left: solid 1px #000000;
      }
      .mobile-nav-item4,
      .mobile-nav-item5 {
        border-bottom: none;
      }
    }
  }

  .title-container {
    background: #ffffff;
    border-right: solid 1px #000000;
    border-left: solid 1px #000000;

    .product-title {
      display: flex;
      align-items: center;
      justify-content: center;
      background: url("../assets/images/android-chrome500.png");
      background-repeat: no-repeat;
      background-position-x: center;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      font-size: 2rem;
      text-decoration: none;
      padding: 0.6rem 0;
      color: #1d1d1d;

      @media screen and (max-width: 900px) {
        border-bottom: solid 1px #000000;
        font-size: 1.6rem;
      }
    }
  }
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: black;
    border-bottom: solid 1px #000000;
    z-index: 100;
    text-transform: capitalize;

    p {
      animation: fadeOut 0.3s linear;
    }
  }

  .border-left {
    border-left: solid 1px #000000;
  }
  .border-right {
    border-right: solid 1px #000000;
  }
  .nav-item1,
  .nav-item2,
  .nav-item3,
  .nav-item4 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: black;
    border-bottom: solid 1px #000000;
  }
  .nav-item1,
  .nav-item2 {
    border-left: solid 1px #000000;
  }
  .nav-item3 {
    border-left: solid 1px #000000;
  }
  .nav-item3,
  .nav-item4 {
    border-right: solid 1px #000000;
  }
  .nav-item2,
  .nav-item3 {
    border-top: solid 1px #000000;
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
    transition: 0.3s;
    cursor: pointer;
  }

  .cart {
    background: #1d1d1d;
    color: #ffffff;
  }

  .nav-item4:hover,
  .nav-item:hover,
  .nav-item1:hover,
  .nav-item2:hover,
  .nav-item3:hover {
    color: #65ac4d;
    // transition: 0.3s;
  }

  .cart:hover {
    color: #65ac4d;
    transition: 0.3s;
  }

  .desktop-view {
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  .mobile-view {
    display: none;
    @media screen and (max-width: 900px) {
      display: flex;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
