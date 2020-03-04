<template>
  <div id="footer">
    <div class="footer-container">
      <div class="footer-nav">
        <div class="box">
          <div class="small-header-text">Shop</div>
          <div class="info-text">Returns</div>
          <div class="info-text">Payment</div>
          <div class="info-text">Delivery</div>
          <div class="info-text">Terms&Conditions</div>
        </div>
        <div class="box">
          <div class="paas-small-header-text">Power as a service</div>
          <div class="info-text">
            <a
              href="https://calculator.imperiumng.com/"
              target="_blank"
              class="info-text"
              >Energy Calculator</a
            >
          </div>
          <div class="info-text">Plans</div>
          <div class="info-text">Purchase</div>
          <div class="info-text">Lease to Own</div>
        </div>
      </div>

      <div class="mobile-footer-nav">
        <div class="box first-box">
          <div class="small-header-text">Shop</div>
          <div class="info-text">Returns</div>
          <div class="info-text">Payment</div>
          <div class="info-text">Delivery</div>
          <div class="info-text">Terms & Conditions</div>
        </div>
        <div class="box border-right-none">
          <div class="paas-small-header-text">Power As A Service</div>
          <div class="mobile-paas-small-header-text">PaaS</div>
          <div class="info-text">
            <a
              href="https://calculator.imperiumng.com/"
              target="_blank"
              class="info-text"
              >Energy Calculator</a
            >
          </div>
          <div class="info-text">Plans</div>
          <div class="info-text">Purchase</div>
          <div class="info-text">Lease to Own</div>
        </div>
        <!-- <div class="box ">
          <div class="small-header-text">AltPay</div>
          <div class="info-text">Terms&Conditions</div>
        </div> -->
      </div>
      <div class="box last-box">
        <div class="small-header-text">Can't find what you're looking for?</div>
        <div class="send-mail-div">
          <a
            tag="button"
            class="button-send-mail"
            href="mailto:Imperiumng@sterlinbankng.com"
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
  name: "Footer"
};
</script>

<style lang="scss" scoped>
#footer {
  margin: 2rem 0;

  a {
    text-decoration: none;
    // width: auto !important;
  }

  .footer-container {
    width: 99.9%;
    border: solid 1px #000000;
    display: flex;

    .footer-nav {
      flex: 1;
      display: flex;

      .box {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        align-items: flex-start;
        border-right: solid 1px #000000;
        padding: 2rem;

        .small-header-text,
        .paas-small-header-text {
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
          color: #1b1b1b;
        }

        .info-text {
          color: #1b1b1b;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          cursor: pointer;
        }
      }
    }

    .mobile-footer-nav {
      display: none;
    }
  }
  .last-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    border-right: none;

    .small-header-text {
      font-size: 1.1rem;
      color: #1b1b1b;
    }
  }

  .send-mail-div {
    margin-top: 1rem;
  }

  .button-send-mail {
    font-size: 0.9rem;
    border: #000000 1px solid;
    padding: 0.8rem 10rem;
    transition: 0.5s ease-in-out;
    color: #1b1b1b;
    text-decoration: none;
    outline: none;
  }
  .button-send-mail:hover {
    background: #1b1b1b;
    color: white;
    transition: 0.5s ease-in-out;
  }
}
</style>
