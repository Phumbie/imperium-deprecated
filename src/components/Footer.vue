<template>
  <div id="footer">
    <!-- <span class="section-title">Help & Support</span> -->
    <div class="details-container">
      <span class="box">
        <div class="small-header-text">Shop</div>
        <div class="info-text">Returns</div>
        <div class="info-text">Payment</div>
        <div class="info-text">Delivery</div>
      </span>
      <div class="box">
        <div class="small-header-text">Power As A Service</div>
        <div class="info-text">
          <a 
            href="https://alt-power-calculator.netlify.com/" 
            target="blank" 
            class="info-text"
          >
            Energy Calculator
          </a>
        </div>
        <div class="info-text">Plans</div>
        <div class="info-text">Outright Purchase</div>
        <div class="info-text">Lease to Own</div>
      </div>
      <div class="box">
        <div class="small-header-text">AltPay</div>
        <div class="info-text">Terms & Conditions</div>
      </div>
      <span class="box">
        <p class="small-header-text">Can't find what you're looking for?</p>
        <router-link to="#" tag="button" class="button-send-mail">Send us an email</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',  
}
</script>

<style lang="scss" scoped>
#footer{
  a{
    text-decoration: none;
    width: auto !important;
  }

  .details-container{
    margin-top: 29px;
    width: 100%;
    border: solid 1px #000000;
    display: flex;

    .box{
      width: 50%;
      border: none;
      padding-top: 30px;
      padding-left: 20px;
      padding-bottom: 20px;
      padding-right: 0px;

      .small-header-text{
        letter-spacing: 0.43px;
        color: #414b55;
        margin-bottom: 25px;
      }

      .info-text{
        font-weight: normal;
        letter-spacing: 0.43px;
        color: #414b55;
        font-size: 12px;
      }
    }
  }
  .details-container span:last-child{
    width: 140%;
    border-right: none;
    border-left: solid 1px black;
    text-align: center;
  }
  .details-container span:first-child{
    width: 30%;
  }
  .button-send-mail{
    width: 50%;
    // margin-top: 25px;
    font-size: 14px;
    background: none;
    padding: 12px 0;
    transition: 0.5s ease-in-out;
    outline: none;
  }
  .button-send-mail:hover{
    background: black;
    color: white;
    transition: 0.5s ease-in-out;
  }
  .box p:first-child{
    margin-top: 8%;
  }
}
</style>