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
        <div class="cart-list" v-else-if ="fetchedLocalStorage">
      <div class="header-section">
        <div class="text-product-details">Product details</div>
        <div class="text-quantity">Quantity</div>
        <div class="text-amount">Total amount</div>
      </div>
      <div 
        class="cart-item" 
        v-for="(n, index) in clientArr.length" 
        :key="index"
      >
        <div class="product-img-name-section">
          <div class="image-container">
            <img :src="clientArr[index].display_image">
          </div>
          <div class="product-name-price-section">
            <div class="product-name">
              {{ clientArr[index].name }}
            </div>
            <div class="price">
              ₦ {{ (clientArr[index].price/100).toLocaleString() }}
            </div>
            <button 
              class="button-remove" 
              @click="removeProductFromCart(clientArr[index].id)"
            >
              Remove
            </button>
          </div>
        </div>
        <div class="quantity-section">
          <button 
            class="button-minus"
            @click="decreaseProductQuantity(clientArr[index].id)"
          >
            -
          </button>
          <span class="quantity">{{ clientArr[index].quantity }}</span>
          <button
            class="button-plus"
            @click="increaseProductQuantity(clientArr[index].id)"
          >
            +
          </button>
        </div>
        <div class="amount-section">
          <div class="amount">
            ₦ {{ 
              (clientArr[index].price * clientArr[index]
              .quantity/100).toLocaleString() 
            }}
          </div>
        </div>
      </div>
    </div>
    <content-loader v-else>
      <div v-if="show" class="loader"></div>
      <span v-else>{{ contentLoaderText }}</span>
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
        <button @click="navigateTo('/')">
          Continue shopping
        </button>
        <button class="bg-black" @click="checkout()">
          Check out
        </button>
      </div>
    </div>
    <div 
      class="shop-checkout-buttons-section"
      v-else-if ="fetchedLocalStorage"
    >
      <div class="subtotal-section">
        <span>Subtotal</span>
        <span>
          ₦ {{ (subtotalArr/100).toLocaleString() }}
        </span>
      </div>
      <div class="text">
        Delivery and taxes are calculated at checkout
      </div>
      <div class="buttons">
        <button @click="navigateTo('/')">
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
import contentLoader from "@/components/ContentLoader"

export default {
  name: 'ShoppingCart',
  components: {
    contentLoader
  },
  data () {
    return {
      fetchedCart: false,
      fetchedLocalStorage: false,
      productsList: [],
      clientArr: [],
      localCart: [],
      subtotalArr: [],
      customerCart: {},
      contentLoaderText: "",
      show: true
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
      if(!localStorage.getItem("user_details")) {
        api
        .getAllProducts()
        .then(({ data }) => {
          this.productsList = data.data.result;
          JSON.parse(localStorage.getItem("product_id")).map(item => {
            this.productsList.map(product => {
              if(product.id === item.id) {
                product.local_id = item.id
                product.quantity = item.quantity
                product.subtotal = item.subtotal
                this.clientArr.push(product)
              }
            })
          })
          JSON.parse(localStorage.getItem("product_id")).map((item, index) => {
            this.subtotalArr.push(item.subtotal)
          })
          localStorage.setItem("subtotal_arr", JSON.stringify(this.subtotalArr))
          localStorage.setItem("local_cart", JSON.stringify(this.clientArr))
          this.subtotalArr = this.subtotalArr.reduce(function(acc, value){
            return acc + value}, 0) 
          localStorage.setItem("subtotal", JSON.stringify(this.subtotalArr))
          this.checkIfLocalStorageIsEmpty()
        })
        .catch(({ response }) => {
        });
        return
      }
        api
          .getCart()
          .then(({ data }) => {
            if(data.status == "success"){
              this.customerCart = data.data;
              this.checkIfCartIsEmpty();
              // console.log(this.customerCart);
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
      if(!localStorage.getItem("user_details")) {
        let local_items = JSON.parse(localStorage.getItem("product_id"))
        let counter = JSON.parse(localStorage.getItem("cartCounter"))
        local_items.map((item, index) => {
          if(item.id === productId){
            counter -= item.quantity
            item.quantity = 0
            this.subtotalArr -= item.subtotal
            local_items.splice(index, 1)
            this.$store.dispatch('setCartCounter', counter);
          }
        })
        localStorage.setItem("product_id", JSON.stringify(local_items))
        this.clientArr = []
          JSON.parse(localStorage.getItem("product_id")).map(item => {
            this.productsList.map(product => {
              if(product.id === item.id) {
                product.local_id = item.id
                product.quantity = item.quantity
                this.clientArr.push(product)
              }
            })
          })
        localStorage.setItem("local_cart", JSON.stringify(this.clientArr))
        this.checkIfLocalStorageIsEmpty()
        alert("Successfully removed product from cart");
        return
      }
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
        this.show = false;
        this.contentLoaderText = "Nothing to show";
        return;
      }

      this.fetchedCart = true;
    },
    checkIfLocalStorageIsEmpty() {
      this.fetchedLocalStorage = false;

      if(this.clientArr.length === 0){
        this.show = false;
        this.contentLoaderText = "Nothing to show";
        return;
      }

      this.fetchedLocalStorage = true;
    },
    decreaseProductQuantity(productId) {
      if(!localStorage.getItem("user_details")) {
        let localCart = JSON.parse(localStorage.getItem("local_cart"))
        let localQuantity = JSON.parse(localStorage.getItem("product_id"))
        localCart.map(item => {
          localQuantity.map(items => {
            if(item.quantity == 0){
              return
            }
            if(item.id === productId && items.id === productId && item.quantity !== 0){
              item.quantity = item.quantity -= 1
              items.quantity = items.quantity -= 1
              items.subtotal -= item.price
              this.subtotalArr -= item.price
              localStorage.setItem("local_cart", JSON.stringify(localCart))
              localStorage.setItem("product_id", JSON.stringify(localQuantity))
              this.clientArr = JSON.parse(localStorage.getItem("local_cart"))
              this.$store.dispatch('decrementCartCounter');
            }
          })
        })
        return
      }
      api
        .decreaseProductQuantityInCart(productId)
        .then(({ data }) => {
          if(data.status == "success"){
            this.customerCart = data.data;
            this.$store.dispatch('decrementCartCounter');
            this.checkIfCartIsEmpty();
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    increaseProductQuantity(productId) {
      if(!localStorage.getItem("user_details")) {
        let localCart = JSON.parse(localStorage.getItem("local_cart"))
        let localQuantity = JSON.parse(localStorage.getItem("product_id"))
        localCart.map(item => {
          localQuantity.map(items => {
            if(item.quantity == item.stock.quantity_available){
              return
            }
            if(item.id === productId && items.id === productId
              && item.quantity !== item.stock.quantity_available){
              item.quantity = item.quantity += 1
              items.quantity = items.quantity += 1
              items.subtotal += item.price
              this.subtotalArr += item.price
              localStorage.setItem("local_cart", JSON.stringify(localCart))
              localStorage.setItem("product_id", JSON.stringify(localQuantity))
              this.clientArr = JSON.parse(localStorage.getItem("local_cart"))
              this.$store.dispatch('incrementCartCounter');
            }
          })
        })
        return
      }
      api
        .addProductToCart(productId)
        .then(({ data }) => {
          if(data.status == "success"){
            this.customerCart = data.data;
            this.$store.dispatch('incrementCartCounter');
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
    checkout() {
      if (!localStorage.getItem("user_details")) {
        alert("You have to login or signup to check out 🙃");
        this.navigateTo("/login");
        return;
      }
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