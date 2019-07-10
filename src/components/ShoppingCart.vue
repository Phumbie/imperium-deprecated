<template>
  <div id="cart-section">
    <div class="header-text-28">Shopping Cart</div>
    <div class="cart-list" v-if="fetchedCart">
      <div class="header-section">
        <div class="text-product-details">Product details</div>
        <div class="text-quantity">Quantity</div>
        <div class="text-amount">Total amount</div>
      </div>
      <div 
        class="cart-item" 
        v-for="(n, index) in cartItems.length" 
        :key="index"
      >
        <div class="product-img-name-section">
          <div class="image-container">
            <img :src="cartItems[index].product.display_image">
          </div>
          <div class="product-name-price-section">
            <div class="product-name">
              {{ cartItems[index].product.name }}
            </div>
            <div class="price">
              ₦ {{ (cartItems[index].product.price/100).toLocaleString() }}
            </div>
            <button 
              class="button-remove" 
              @click="removeProductFromCart(cartItems[index].product.id)"
            >
              Remove
            </button>
          </div>
        </div>
        <div class="quantity-section">
          <button 
            class="button-minus"
            @click="decreaseProductQuantity(cartItems[index].product.id)"
          >
            -
          </button>
          <span class="quantity">{{ cartItems[index].quantity }}</span>
          <button
            class="button-plus"
            @click="increaseProductQuantity(cartItems[index].product.id)"
          >
            +
          </button>
        </div>
        <div class="amount-section">
          <div class="amount">
            ₦ {{ 
              (cartItems[index].product.price * cartItems[index]
              .quantity/100).toLocaleString() 
            }}
          </div>
        </div>
      </div>
    </div>
    <content-loader v-else>
      <span>{{ contentLoaderText }}</span>
    </content-loader>
    <div 
      class="shop-checkout-buttons-section"
      v-if="fetchedCart"
    >
      <div class="subtotal-section">
        <span>Subtotal</span>
        <span>
          ₦ {{ (subtotal/100).toLocaleString() }}
        </span>
      </div>
      <div class="text">
        Delivery and taxes are calculated at checkout
      </div>
      <div class="buttons">
        <button @click="goTo('/product-catalogue')">
          Continue shopping
        </button>
        <button class="bg-black" @click="checkout()">
          Check out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader"

export default {
  name: 'ShoppingCart',
  components: {
    contentLoader
  },
  data () {
    return {
      fetchedCart: false,
      customerCart: {},
      contentLoaderText: "Fetching cart..."
    }
  },
  mounted(){
    this.getCart();
  },
  computed: {
    cartItems: function() {
      return this.customerCart.cart.items;
    },
    subtotal: function() {
      return this.customerCart.sub_total;
    },
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    getCart() {
      api
        .getCart()
        .then(({ data }) => {
          if(data.status == "success"){
            this.customerCart = data.data;
            this.checkIfCartIsEmpty();
          }
        })
        .catch(({ response }) => {
          let errorMessage = "Unable to fetch cart items :("
          if(response){
            errorMessage = this.response.message;
          }
          alert(errorMessage);
        });
    },
    removeProductFromCart(productId) {
      api
        .removeFromCart(productId)
        .then(({ data }) => {
          if(data.status == "success"){
            this.customerCart = data.data;
            this.checkIfCartIsEmpty();
            alert("Successfully removed product from cart");
          }
        })
        .catch(({ response }) => {
          // alert("An error occurred while removing product");
          alert(response.data.message);
        });
    },
    checkIfCartIsEmpty() {
      this.fetchedCart = false;

      if(this.cartItems.length == 0){
        this.contentLoaderText = "Nothing to show";
        return;
      }

      this.fetchedCart = true;
    },
    decreaseProductQuantity(productId) {
      api
        .decreaseProductQuantityInCart(productId)
        .then(({ data }) => {
          if(data.status == "success"){
            this.customerCart = data.data;
            this.checkIfCartIsEmpty();
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    increaseProductQuantity(productId) {
      api
        .addProductToCart(productId)
        .then(({ data }) => {
          if(data.status == "success"){
            this.customerCart = data.data;
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    checkout() {
      api
        .cartCheckout()
        .then(({ data }) => {
          if(data.status == "success"){
            // console.log(data.data);
            localStorage.setItem('user_order', JSON.stringify(data.data.order));
            this.navigateTo("/checkout");
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    }
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