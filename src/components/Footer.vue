<template>
  <div id="footer">
    <div class="footer-container">
      <div class="box">
        <div class="small-header-text">Shop</div>
        <div class="info-text">Returns</div>
        <div class="info-text">Payment</div>
        <div class="info-text">Delivery</div>
        <div class="info-text">Terms&Conditions</div>
      </div>
      <div class="box">
        <div class="small-header-text">Power as a service</div>
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
      <div class="box last-box">
        <div class="small-header-text">Can't find what you're looking for?</div>
        <div class="info-text send-mail-div">
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
  margin-bottom: 2rem;
  margin-top: 12rem;
  border: solid 1px #000000;
  border-right: none;
  border-bottom: none;

  a {
    text-decoration: none;
  }

  .footer-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;

    .box {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      align-items: flex-start;
      border-bottom: solid 0.0625rem #000000;
      border-right: solid 1px #000000;
      padding: 2rem;

      .small-header-text {
        font-family: HelveticaNeue;
        font-size: 1.3rem;
        font-weight: 500;
        letter-spacing: 0.003rem;
        color: #353535;
        margin-bottom: 0.5rem;
      }

      .info-text {
        font-family: HelveticaNeue;
        font-size: 0.9rem;
        color: #1b1b1b;
        // font-weight: 500;
        letter-spacing: 0.03rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
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

      .small-header-text {
        font-size: 1.1rem;
        color: #1b1b1b;
      }

      .send-mail-div {
        margin-top: 0.5rem;
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
  }
}
</style>
