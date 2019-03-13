<template>
  <div id="paas-section">
    <div class="header-text-28">Simple, affordable monthly payments</div> 
    <div class="small-text">Input your projected monthly power consumption or preferred monthly spend</div>
    <div class="power-consumption-field">
      <input type="number" placeholder="KW/HR" class="text-field">
        <button>Consumption</button>
    </div>
    <div class="small-text full-width">Choose a monthly subscription that fits your consumption band</div>
    <div class="products-container">
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
      <div class="product-item">
        <div class="centered-content">
          <div class="power-consumption">5KW/h</div>
          <div class="price">N 100,000.00</div>
          <div class="very-small-text">Service guaranty </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'TopNav',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#paas-section{
  padding-top: 36px;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;

  .power-consumption-field{
    width: 25%;
    height: 50px;
    // background: #d8d8d86c;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 32px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .text-field{
      width: 60%;
      border: none;
      background: #d8d8d86c;
      font-size: 18px;
      padding-left: 20px;
    }

    button{
      width: 40%;
      height: 100%;
      border: none;
      background: black;
      color: white;
      cursor: pointer;
    }
  }

  .products-container{
    width: 100%;
    border: solid 1px #000000;
    margin-top: 31px;
    float: left;

    .product-item{
      border-right: solid 1px #000000;
      border-bottom: solid 1px black;
      width: 24.93%;
      float: left;

      .centered-content{
        width: 50%;
        margin: 0 auto;
        height: 100px;
        // background: bisque;
        padding-top: 30px;
        padding-bottom: 30px;

        .power-consumption{
          font-size: 18px;
          line-height: 1.14;
          color: #4a90e2;
          margin-bottom: 6px;
        }

        .price{
          font-size: 30px;
           line-height: 1.23;
           margin-bottom: 6px;
        }

        .very-small-text{
          font-size: 16px;
          line-height: 1.33;
          color: #637381;
        }
      }
    }
  }
}
</style>
