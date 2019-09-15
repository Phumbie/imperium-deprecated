<template>
  <div id="paas-sub">
    <div class="left-side">
      <div class="box-container">
        <div class="header-text-28">Simple, affordable monthly payments</div> 
        <div class="txt-choose-plan">Choose a monthly subscription plan for your home</div>
        <div class="section-home-type">
          <div class="label">Home type</div>
          <select class="dropdown">
            <option>1 bedroom</option>
            <option>2 bedroom</option>
            <option>3 bedroom</option>
            <option>4 bedroom Type A</option>
            <option>4 bedroom Type B</option>
          </select>
        </div>
        <div class="section-location">
          <div class="label">Location</div>
          <select class="dropdown">
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Port Harcout</option>
            <option>Osun</option>
          </select>
        </div>
        <div class="section-available-configs">
          <span class="label">AVAILABLE CONFIGURATIONS</span>
          <span class="label color-green float-right text-trans-normal">Try our calculator</span>
          <div class="config-list">
            <div class="config">
              <span class="power-rating">A 0.9 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button">
            </div>
            <div class="config">
              <span class="power-rating">B 1.5 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button">
            </div>
            <div class="config">
              <span class="power-rating">C 2 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button">
            </div>
            <div class="config">
              <span class="power-rating">D 0.9 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button">
            </div>
            <div class="config">
              <span class="power-rating">E 1.5 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button">
            </div>
            <div class="config">
              <span class="power-rating">F 2 KW</span>
              <input type="radio" name="gender" value="rating-0.9kw" class="radio-button">
            </div>
          </div>
        </div>
        <div class="txt-monthly-cost">Billed monthly at N200,000.00</div>
        <button @click="goTo('paas/appliance-configuration')">See details</button>
      </div>
    </div>
    <div class="right-side">
      <img src="../assets/images/renewable-image.svg">
    </div>
  </div> 
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goTo(page) {
      this.$router.push(page); 
    },
  }
}
</script>

<style lang="scss" scoped>
#paas-sub{
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  .left-side{
    width: 50%;
  }

  .right-side{
    width: 50%;
    padding-top: 100px;
    img{
      // width: 100%;
      height: 80%;
      object-position: right;
      object-fit: contain;
    }
  }

  .box-container{
    width: 85%;
    background: white;
    margin: 0 auto;
    // box-shadow: 0px 0px 15px #aaaaaa93;
    box-shadow: 0 9px 42px 6px rgba(35, 38, 42, 0.08), 0 2px 3px 0 rgba(73, 73, 85, 0.06);
    margin-top: 20px;
    border-radius: 5px;
    padding: 38px 43px 38px 43px;
    box-sizing: border-box;
    float: left;

    .float-right{
      float: right;
    }

    .color-green{
      color: #1b8d19;
    }

    .text-trans-normal{
      text-transform: capitalize !important;
    }

    .header-text-28{
      text-align: left;
    }

    .txt-choose-plan{
      margin-top: 16px;
      margin-bottom: 30px;
    }

    .label{
      font-size: 12px;
      text-transform: uppercase;
    }

    .section-home-type, .section-location{
      width: 48%;
      float: left;

      .dropdown{
        margin-top: 10px;
        width: 100%;
        height: 36px;
        outline: none;
      }
    }

    .section-location{
      float: right;
    }

    .section-available-configs{
      margin-top: 24px;
      float: left;
      width: 100%;

      .config-list{
        width: 100%;
        float: left;
        margin-top: 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        .config{
          width: 32%;
          border-radius: 5px;
          border: solid 1px #979797;
          padding: 20px 15px 20px 15px;
          box-sizing: border-box;
          margin-bottom: 15px;

          .power-rating{
            font-size: 14px;
          }

          .radio-button{
            float: right;
          }
        }
      }
    }

    .txt-monthly-cost{
      font-size: 14px;
      margin-top: 20px;
      margin-bottom: 20px;
      float: left;
    }

    button{
      float: left;
      width: 100%;
      padding-top: 15px;
      padding-bottom: 15px;
      border-radius: 3px;
      background-color: black;
      background: #59a358;
      color: white;
      font-size: 15px;
      border-radius: 5px;
      outline: none;
      border: none;
    }
  }

}
</style>
