<template>
  <div id="cart-section">
    <div class="header-text-28">Shopping Cart</div>
    <div class="cart-list">
      <div class="header-section">
        <div class="text-product-details">Product details</div>
        <div class="text-quantity">Quantity</div>
        <div class="text-amount">Total amount</div>
      </div>
      <div class="cart-item" v-for="(n, index) in 2" :key="index">
        <div class="product-img-name-section">
          <div class="image-container">
            <img src="../assets/images/battery.jpg">
          </div>
          <div class="product-name-price-section">
            <div class="product-name">Rnewable Sun Max</div>
            <div class="price">N 1,600</div>
            <button class="button-remove">Remove</button>
          </div>
        </div>
        <div class="quantity-section">
          <button class="button-minus">-</button>
          <span class="quantity">1</span>
          <button class="button-plus">+</button>
        </div>
        <div class="amount-section">
          <div class="amount">N 120,000</div>
        </div>
      </div>
    </div>
    <div class="shop-checkout-buttons-section">
      <div class="subtotal-section">
        <span>Subtotal</span>
        <span>N 240,000</span>
      </div>
      <div class="text">Delivery and taxes are calculated at checkout</div>
      <div class="buttons">
        <button @click="goTo('/product-catalogue')">Continue shopping</button>
        <button class="bg-black" @click="goTo('/checkout')">Check out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
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
#cart-section{
  .header-section{
    width: 100%;
    margin-top: 50px;
    border-bottom: solid 1px black;
    float: left;
    padding-bottom: 10px;

    .text-product-details{
      width: 50%;
      float: left;
    }

    .text-quantity, .text-amount{
      width: 25%;
      float: left;
    }
  }

  .cart-item{
    width: 100%;
    padding-top: 14px;
    padding-bottom: 14px;
    float: left;
    border-bottom: solid 1px black;

    .product-img-name-section{
      width: 50%;
      // background: bisque;
      float: left;
      display: flex;

      .image-container{
        width: 40%;
        background: gray;
        height: 320px;
        float: left;
      }

      .product-name-price-section{
        width: 60%;
        float: left;
        padding-top: 70px;
        padding-left: 24px;

        .product-name{
          font-size: 26px;
          margin-bottom: 20px;
        }

        .price{
          font-size: 20px;
        }

        .button-remove{
          margin-top: 50px;
          text-decoration: underline;
          cursor: pointer;
          background: transparent;
          border: none;
          font-size: 16px;
          padding-left: 0px;
        }

      }
    }

    .quantity-section{
      width: 25%;
      float: left;
      padding-top: 100px;
      font-size: 18px;

      button{
        font-size: 20px;
        background: transparent;
        border: none;
      }
    }

    .amount-section{
      padding-top: 100px;
      font-size: 24px;
    }
  }

  .shop-checkout-buttons-section{
    width: 100%;
    padding-top: 50px;

    .subtotal-section{
      display: flex;
      justify-content: flex-end;
      font-size: 20px;

      span{
        margin-left: 40px;
      }
    }

    div.text{
      float: right;
      text-align: right;
      font-size: 17px;
      margin-top: 15px;
      margin-bottom: 20px;
    }

    .buttons{
      display: flex;
      justify-content: flex-end;
      width: 100%;

      button{
        margin-left: 20px;
        border: solid 1px black;
        font-size: 16px;
        padding: 20px 40px 20px 40px;
        background: transparent;

        a{
          text-decoration: none;
          color: black;
        }
      }

      button.bg-black{
        background: black;
        color: white;

        a{
          text-decoration: none;
          color: white;
        }
      }
    }
  }
}
</style>
