<template>
  <div id="nav-container">
    <section class="top-section">
      <router-link to="/my-account" class="nav-item border-left desktop-view"
        >Account</router-link
      >
      <div class="mobile-nav-item breadcrumb border-left mobile-view">
        <input type="checkbox" class="toggler" />
        <div class="hamburger"><div></div></div>
        <div class="menu">
          <!-- <div>
            <ul>
              <li>
                <a href="https://www.imperiumng.com/about">About</a>
              </li>
              <li>
                <a href="/">
                  Calculator
                </a>
              </li>
              <li>
                <a :href="shopURL">
                  Shop
                </a>
              </li>
              <li>
                <a href="https://www.imperiumng.com/faqs">
                  Faqs
                </a>
              </li>
              <li>
                <a href="https://www.imperiumng.com/blog">
                  Blog
                </a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
      <router-link to="/" class="product-title">Imperium</router-link>
      <router-link to="/cart" class="nav-item border-right desktop-view"
        >Shopping cart ({{
          cartCounter === 0 ? "0" : cartCounter
        }})</router-link
      >
      <router-link to="/cart" class="mobile-nav-item border-right mobile-view"
        >Cart ({{ cartCounter === 0 ? "0" : cartCounter }})</router-link
      >
    </section>
    <section class="bottom-section">
      <a
        href="https://calculator.imperiumng.com/"
        target="_blank"
        class="nav-item1 border-left"
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
      presentScrollPosition: ""
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapGetters(["cartCounter"])
  },
  mounted() {
    this.setCartCounter();
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
          ease: "Power0.easeInOut"
        });
      } else {
        gsap.to(".bottom-section", {
          y: -1,
          duration: 0.2,
          ease: "Power0.easeInOut"
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
  width: calc(100% + 1px);
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

    .breadcrumb {
      position: relative;
      font-size: 14px;
      right: 0;
      top: 0;
      z-index: 100;

      .toggler {
        position: absolute;
        right: 2rem;
        top: 1.2rem;
        z-index: 300;
        cursor: pointer;
        width: 1.8rem;
        height: 3rem;
        opacity: 0;
      }

      .hamburger {
        position: absolute;
        right: 2rem;
        top: 1.2rem;
        z-index: 200;
        cursor: pointer;
        width: 2rem;
        height: 3.2rem;
        padding: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      // hamburger line
      .hamburger > div {
        position: relative;
        width: 100%;
        height: 0.2rem;
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
        top: -0.6rem;
        width: 100%;
        height: 0.2rem;
        z-index: 200;
        background-color: black;
        opacity: 0.6;
      }

      .hamburger > div:after {
        top: 0.6rem;
      }

      .toggler:checked + .hamburger > div {
        transform: rotate(135deg);
      }

      .toggler:checked + .hamburger > div:before,
      .toggler:checked + .hamburger > div:after {
        top: 0;
        transform: rotate(90deg);
      }

      .toggler:checked:hover + .hamburger > div {
        transform: rotate(225deg);
      }

      .menu {
        position: fixed;
        top: 4rem;
        right: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 3rem;
        padding-right: 2rem;
        // padding-left: 2rem;
        background-color: #f5f9f5;
        // opacity: 0;
        visibility: hidden;

        ul {
          list-style: none;
          li {
            padding-top: 2rem;

            a {
              text-decoration: none;
              color: black;
              opacity: 0.6;
              transition: opacity 1s;
            }
          }
        }

        a:hover {
          color: black;
          opacity: 1;
          transition: opacity 1s;
        }
      }

      .toggler:checked ~ .menu {
        visibility: visible;
      }
    }

    .mobile-nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0;
      text-align: center;
      background: white;
      color: black;
      border-bottom: solid 0.0625rem #000000;
      z-index: 100;
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
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
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
