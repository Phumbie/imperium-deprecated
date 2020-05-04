<template>
  <div id="nav-container">
    <section class="top-section">
      <router-link to="/my-account" class="nav-item border-left desktop-view"
        >Account</router-link
      >
      <div class="mobile-nav-item breadcrumb border-left">
        <input type="checkbox" class="toggler" ref="checkBox" @click="toggle" />
        <div class="hamburger"><div></div></div>
      </div>
      <router-link to="/" class="product-title">Imperium</router-link>
      <router-link to="/cart" class="nav-item border-right desktop-view"
        >Shopping cart ({{
          cartCounter === 0 ? "0" : cartCounter
        }})</router-link
      >
      <router-link to="/cart" class="mobile-nav-item border-right"
        ><i class="el-icon-shopping-cart-2"></i> ({{
          cartCounter === 0 ? "0" : cartCounter
        }})</router-link
      >
    </section>
    <section class="bottom-section">
      <a :href="calculatorURL" target="_blank" class="nav-item1 border-left"
        >Energy Calculator</a
      >
      <a :href="requestAuditURL" target="_blank" class="nav-item2">Buy Power</a>
      <router-link to="/products" class="nav-item3">Buy Products</router-link>
      <a
        class="nav-item4"
        href="https://www.imperiumng.com/blog"
        target="_blank"
        >Blog</a
      >
    </section>
    <section class="mobile-bottom-section">
      <router-link to="/my-account" class="mobile-nav-item1"
        >Account</router-link
      >
      <router-link to="/products" class="mobile-nav-item2"
        >Buy Products</router-link
      >
      <a href="https://www.imperiumng.com/blog" class="mobile-nav-item3">
        Blog
      </a>
      <a :href="calculatorURL" class="mobile-nav-item4">
        Energy Calculator
      </a>
      <a :href="requestAuditURL" class="mobile-nav-item5">Buy Power</a>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { gsap } from "gsap";
import api from "@/utils/api.js";

export default {
  name: "TopNav",
  data() {
    return {
      requestAuditURL: process.env.VUE_APP_REQUEST_AUDIT_URL,
      calculatorURL: process.env.VUE_APP_CALCULATOR_URL,
      presentScrollPosition: "",
      checkBoxStatus: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapGetters(["cartCounter"]),
  },
  mounted() {
    this.setCartCounter();
    this.toggle();
  },
  methods: {
    handleScroll() {
      const topSection = document.querySelector(".top-section");
      const topSectionTop = topSection.getBoundingClientRect().top;
      const topSectionBottom = topSection.getBoundingClientRect().bottom;
      const height = topSectionBottom - topSectionTop;
      if (topSectionTop < 1) {
        gsap.to(".bottom-section", {
          y: -height - 1,
          duration: 0.2,
          ease: "Power0.easeInOut",
        });
      } else {
        gsap.to(".bottom-section", {
          y: -1,
          duration: 0.2,
          ease: "Power0.easeInOut",
        });
      }
    },
    toggle() {
      if (this.$refs.checkBox.checked === true) {
        gsap.to(".mobile-bottom-section", {
          opacity: 1,
          display: "grid",
          duration: 0.1,
          ease: "Power0.easeInOut",
        });
      }
      if (this.$refs.checkBox.checked === false) {
        gsap.to(".mobile-bottom-section", {
          opacity: 0,
          display: "none",
          duration: 0.1,
          ease: "Power0.easeInOut",
        });
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
            this.$swal.fire({
              icon: "error",
              html: "Unauthorized account",
            });
          }
        });
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
  margin: 38px 0;
  top: -1px;
  z-index: 10;

  .top-section {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    border-top: solid 0.0625rem #000000;

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

      // .toggler:checked + .hamburger > div {
      //   transform: rotate(135deg);
      // }

      // .toggler:checked + .hamburger > div:before,
      // .toggler:checked + .hamburger > div:after {
      //   top: 0;
      //   transform: rotate(90deg);
      // }
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
        border-bottom: solid 0.0625rem #000000;
        text-decoration: none;
        z-index: 100;
      }

      .el-icon-shopping-cart-2 {
        font-size: 1.4rem;
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
      position: sticky;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      border: solid 0.0625rem #000000;
      border-top: none;
      background: white;

      .mobile-nav-item1,
      .mobile-nav-item2,
      .mobile-nav-item3,
      .mobile-nav-item4,
      .mobile-nav-item5 {
        border-bottom: solid 0.0625rem #000000;
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
        border-left: solid 0.0625rem #000000;
      }
      .mobile-nav-item4,
      .mobile-nav-item5 {
        border-bottom: none;
      }
    }
  }

  .product-title {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-right: solid 0.0625rem #000000;
    border-left: solid 0.0625rem #000000;
    font-size: 2rem;
    text-decoration: none;
    padding: 0.6rem 0;
    color: #1d1d1d;

    @media screen and (max-width: 900px) {
      border-bottom: solid 0.0625rem #000000;
      font-size: 1.6rem;
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: black;
    border-bottom: solid 0.0625rem #000000;
    z-index: 100;
  }

  .border-left {
    border-left: solid 0.0625rem #000000;
  }

  .border-right {
    border-right: solid 0.0625rem #000000;
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
    border-bottom: solid 0.0625rem #000000;
  }

  .nav-item1,
  .nav-item2 {
    border-left: solid 0.0625rem #000000;
  }

  .nav-item3 {
    border-left: solid 0.0625rem #000000;
  }

  .nav-item3,
  .nav-item4 {
    border-right: solid 0.0625rem #000000;
  }

  .nav-item2,
  .nav-item3 {
    border-top: solid 0.0625rem #000000;
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
}
</style>
