<template>
  <div id="footer" class="container">
    <div class="footer-container">
      <div class="box">
        <div class="small-header-text">Shop</div>
        <div class="info-text">Returns</div>
        <div class="info-text">Payment</div>
        <div class="info-text">Privacy policy</div>
        <router-link to="/terms-and-condition" class="info-text margin-bottom"
          >Terms & Conditions</router-link
        >
      </div>
      <div class="box">
        <div class="small-header-text desktop-screen">Power as a service</div>
        <div class="small-header-text mobile-screen">PaaS</div>
        <div class="info-text desktop-screen">
          <a :href="calculatorURL" target="_blank" class="info-text"
            >Energy Calculator</a
          >
        </div>
        <div class="mobile-screen">
          <a :href="calculatorURL" target="_blank" class="info-text"
            >Calculator</a
          >
        </div>
        <div class="info-text">Plans</div>
        <div class="info-text">Purchase</div>
        <div class="info-text margin-bottom">Lease to Own</div>
      </div>
      <div class="box last-box">
        <div class="small-header-text">Can't find what you're looking for?</div>
        <div class="info-text send-mail-div">
          <a
            tag="button"
            class="button-send-mail"
            href="mailto:info@imperiumng.com"
            target="_top"
          >
            Send us an email</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      calculatorURL: process.env.VUE_APP_CALCULATOR_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
#footer {
  margin-bottom: 2rem;
  margin-top: 12rem;
  border: solid 1px #000000;
  border-right: none;
  border-bottom: none;

  .desktop-screen {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }

  .mobile-screen {
    display: none;
    @media screen and (max-width: 600px) {
      display: flex;
    }
  }

  a {
    text-decoration: none;
  }

  .footer-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;

    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 335px) {
      grid-template-columns: 1fr;
    }

    .box {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      align-items: flex-start;
      border-bottom: solid 0.0625rem #000000;
      border-right: solid 1px #000000;
      padding: 2rem;

      @media screen and (max-width: 600px) {
        padding: 2rem 1rem;
      }

      .small-header-text {
        font-family: HelveticaNeue;
        font-size: 1.4rem;
        font-weight: 500;
        letter-spacing: 0.003rem;
        color: #353535;
        margin-bottom: 0.8rem;
      }

      .info-text {
        font-family: HelveticaNeue;
        font-size: 1rem;
        color: #1b1b1b;
        letter-spacing: 0.03rem;
        margin-bottom: 0.7rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          color: #65ac4d;
        }
      }

      .margin-bottom {
        margin-bottom: 0;
      }
    }

    .last-box {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-bottom: solid 0.0625rem #000000;
      border-right: solid 0.0625rem #000000;

      @media screen and (max-width: 1200px) {
        grid-column-start: 1;
        grid-column-end: 3;
      }

      @media screen and (max-width: 335px) {
        grid-column-start: 1;
        grid-column-end: 2;
      }

      .small-header-text {
        font-size: 1.1rem;
        color: #1b1b1b;

        @media screen and (max-width: 375px) {
          font-size: 0.9rem;
        }
      }

      .send-mail-div {
        margin-top: 0.7rem;
      }

      .button-send-mail {
        font-size: 0.9rem;
        border: #000000 1px solid;
        padding: 0.8rem 10rem;
        transition: 0.5s ease-in-out;
        color: #1b1b1b;
        text-decoration: none;
        outline: none;

        @media screen and (max-width: 600px) {
          padding: 0.8rem 6rem;
        }

        @media screen and (max-width: 375px) {
          padding: 0.8rem 4.5rem;
        }

        @media screen and (max-width: 335px) {
          padding: 0.8rem 3rem;
        }
      }
      .button-send-mail:hover {
        color: #65ac4d;
        transition: 0.3s ease-in-out;
      }
    }
  }
}
</style>
