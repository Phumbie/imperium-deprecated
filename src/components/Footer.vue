<template>
  <div id="footer">
    <!-- <span class="section-title">Help & Support</span> -->
    <div class="footer-container">
      <div class="footer-nav">
        <div class="box first-box">
          <div class="small-header-text">Shop</div>
          <div class="info-text">Returns</div>
          <div class="info-text">Payment</div>
          <div class="info-text">Delivery</div>
        </div>
        <div class="box">
          <div class="paas-small-header-text">Power As A Service</div>
          <div class="mobile-paas-small-header-text">PaaS</div>
          <div class="info-text">
            <a
              href="https://calculator.imperiumng.com/"
              target="blank"
              class="info-text"
            >Energy Calculator</a>
          </div>
          <div class="info-text">Plans</div>
          <div class="info-text">Purchase</div>
          <div class="info-text">Lease to Own</div>
        </div>
        <div class="box border-right-none">
          <div class="small-header-text">AltPay</div>
          <div class="info-text">Terms&Conditions</div>
        </div>
      </div>
      <div class="box last-box">
        <p class="small-header-text">Can't find what you're looking for?</p>
        <router-link to="#" tag="button" class="button-send-mail">Send us an email</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
#footer {
  a {
    text-decoration: none;
    width: auto !important;
  }

  .footer-container {
    margin-top: 29px;
    width: 99.9%;
    border: solid 1px #000000;
    display: flex;

    .footer-nav {
      flex: 1;
      display: flex;

      .box {
        flex: 1;
        border-right: solid 1px #000000;
        padding-top: 20px;
        padding-left: 20px;
        padding-bottom: 20px;

        .small-header-text,
        .paas-small-header-text,
        .mobile-paas-small-header-text {
          letter-spacing: 0.43px;
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 20px;
        }

        .mobile-paas-small-header-text {
          display: none;
        }

        .info-text {
          font-weight: normal;
          letter-spacing: 0.43px;
          color: #414b55;
          font-size: 14px;
          margin-bottom: 15px;
          cursor: pointer;
        }
      }
    }
  }
  .last-box {
    flex: 1;
    padding-top: 50px;
    border-right: none;
    text-align: center;
  }

  .button-send-mail {
    width: 50%;
    // margin-top: 25px;
    font-size: 14px;
    background: none;
    padding: 12px 0;
    transition: 0.5s ease-in-out;
    outline: none;
  }
  .button-send-mail:hover {
    background: black;
    color: white;
    transition: 0.5s ease-in-out;
  }
}

//Mobile
@media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) {
  #footer {
    width: 99.7%;

    .footer-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .footer-nav {
        width: 100%;

        .box {
          width: 100%;
          border: none;
          padding-top: 10px;
          padding-left: 10px;
          border-right: solid 1px #000000;
          padding-bottom: 20px;
          padding-right: 0px;

          .small-header-text,
          .mobile-paas-small-header-text {
            display: flex;
            font-weight: bold;
            letter-spacing: 0.43px;
            color: #000000;
            margin-bottom: 14px;
          }

          .paas-small-header-text {
            display: none;
          }

          .info-text {
            font-weight: normal;
            margin-bottom: 10px;
            letter-spacing: 0.43px;
            color: #414b55;
            font-size: 12px;
          }
        }

        .border-right-none {
          border-right: none;
        }
      }
    }
    .last-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
      border-top: solid 1px black;

      p {
        margin: 0;
      }
    }

    .button-send-mail {
      width: 85%;
      margin-top: 15px;
      font-size: 14px;
      background: none;
      padding: 12px 0;
      transition: 0.5s ease-in-out;
      outline: none;
    }
    .button-send-mail:hover {
      background: black;
      color: white;
      transition: 0.5s ease-in-out;
    }
  }
}
</style>