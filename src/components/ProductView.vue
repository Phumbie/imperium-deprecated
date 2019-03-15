<template>
  <div id="product-view">
    <div class="product">
      <div class="image-container">
        <img src="../assets/images/battery.jpg">
      </div>
      <div class="product-details">
        <div class="centered-content">
          <div class="product-name">10Kva Solar inverter</div>
          <div class="price">NGN 200,000.00</div>
          <div class="btn-add-to-cart">Add to cart</div>
          <div class="desc-conf-set">
            <span class="align-left">Description</span>
            <span class="align-right">Setup</span>
            <span class="align-right">Configurations</span>
          </div>
          <div class="long-details">
            Bringing consumers (individuals or corporates), funding agencies, energy solution developers, 
            technical support services and regulators together with a view to connecting the demand and supply for renewable energy resources.
            <br><br>
            What’s more? We offer a Guarantee on the Quality of solutions you get from our installer partners as a consumer.
          </div>
        </div>
      </div>
    </div>
    <div class="header-text-28">Similar Products</div>
    <div class="products-container">
      <div class="product-item" v-for="(n, index) in 4" :key="index">
        <div class="centered-content">
          <div class="image-container">
            <img src="../assets/images/battery.jpg">
          </div>
          <div class="small-text-18">10kWh Battery</div>
          <div class="small-text-18 text-blue">3 configurations</div>
          <div class="small-text-18 text-blue">Suggested loading</div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'ProductView',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#product-view{
  padding-top: 74px;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;

  .product{
    display: flex;
    flex-direction: row;

    .image-container{
      width: 50%;
      background: gray;
    }

    .product-details{
      width: 50%;
      border: solid 1px #000000;

      .centered-content{
        width: 70%;
        margin: 0 auto;
        padding-top: 50px;
        padding-bottom: 130px;

        .long-details{
          line-height: 1.44;
          color: #000000;
          font-size: 18px;
        }

        .product-name{
          font-size: 32px;
          margin-bottom: 18px;
        }

        .price{
          font-size: 24px;
        }

        .btn-add-to-cart{
          width: 100%;
          padding-top: 15px;
          padding-bottom: 15px;
          border: solid 1px #000000;
          text-align: center;
          font-size: 24px;
          margin-top: 45px;
          cursor: pointer;
          transition: 0.5s;
        }
        .btn-add-to-cart:hover{
          background: #000000;
          color: white;
          transition: 0.5s;
        }
      }
    }
  }

  .header-text-28{
    margin-top: 62px;
    margin-bottom: 10px;
  }

  .product-item{
    .centered-content{
      width: 70%;
    }
  }

  .desc-conf-set{
    margin-top: 40px;
    width: 100%;
    font-size: 18px;
    float: left;
    margin-bottom: 27px;

    .align-left{
      float: left;
      width: 50%;
    }

    .align-right{
      float: right;
      width: 20%;
      text-align: right;
    }
  }
}
</style>
