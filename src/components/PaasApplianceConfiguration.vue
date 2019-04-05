<template>
  <div id="paas-appliance-config">
    <div class="left-content">
      <div class="header-text">1 Bedroom 0.9KW</div>
      <div class="text-monthly-price">NGN 200,000.00 per month</div>
      <div class="small-text">Description</div>
      <div class="long-desc">Bringing consumers (individuals or corporates), funding agencies, energy solution developers, technical support services and regulators together with a view to connecting the demand and supply for renewable energy resources.</div>
    </div>
    <div class="right-content">
      <div class="appliance-config-text">Appliance Configuration</div>
      <div class="small-text">Choose the quantity of appliances you wish to load on your inverter</div>
      <div class="item-qty-label">
        <span>Item</span>
        <span class="float-right">Qty</span>
      </div>
      <div class="appliance">
        <span class="name">Bulb (18W)</span>
        <span class="name float-right">3</span>
        <input type="range" min="1" max="100" value="30" class="slider">
      </div>
      <div class="appliance">
        <span class="name">Small fan (20W)</span>
        <span class="name float-right">1</span>
        <input type="range" min="1" max="100" value="10" class="slider">
      </div>
      <div class="appliance">
        <span class="name">Refrigerator (20W)</span>
        <span class="name float-right">1</span>
        <input type="range" min="1" max="100" value="10" class="slider">
      </div>
      <div class="total-power-rating">0.3 of 0.9KW</div>
      <button class="button-check-eligibilty" @click="goTo('register')">Check eligibility</button>
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
#paas-appliance-config{
  padding-top: 40px;
  padding-bottom: 30px;
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  .float-right{
    float: right;
  }

  .left-content{
    width: 40%;
    padding-top: 50px;

    .header-text{
      font-size: 36px;
    }

    .text-monthly-price{
      font-size: 26px;
      margin-top: 18px;
    }

    .small-text{
      text-align: left;
      float: left;
      margin-top: 38px;
      width: 100%;
    }

    .long-desc{
      margin-top: 27px;
      float: left;
      line-height: 1.44;
      font-size: 17px;
    }
  }

  .right-content{
    width: 42%;
    background: white;
    box-shadow: 0 9px 42px 6px rgba(35, 38, 42, 0.08), 0 2px 3px 0 rgba(73, 73, 85, 0.06);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 43px 46px 30px 46px;

    .appliance-config-text{
      font-size: 22px;
    }

    .small-text{
      text-align: left;
      float: left;
      width: 100%;
      font-size: 16px;
    }

    .item-qty-label{
      margin-top: 30px;
      float: left;
      width: 100%;
      margin-bottom: 41px;
    }

    .appliance{
      margin-bottom: 45px;

      .name{
        font-size: 18px;
      }

      .slider {
        width: 100%;
        margin-top: 27px;
        -webkit-appearance: none;
        height: 5px;
        outline: none;
        -webkit-transition: .2s;
        transition: opacity .2s;
        border-radius: 3px;
        background: #dddddd;
      }

      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        background: white;
        box-shadow: 0 2px 4px 0 rgba(120, 120, 120, 0.5);
        cursor: pointer;
        border-radius: 50px;
        background-color: #a2d1a2;
        //  background-color: #7eb17d;
      }

      .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background: white;
        box-shadow: 0 2px 4px 0 rgba(120, 120, 120, 0.5);
        cursor: pointer;
        border-radius: 50px;
      }
    }

    .total-power-rating{
      font-size: 28px;
      text-align: center;
    }

    .button-check-eligibilty{
      color: white;
      width: 100%;
      border-radius: 5px;
      background-color: #59a358;
      margin-top: 28px;
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: 15px;
      outline: none;
      border: none;
    }
  }
}
</style>
