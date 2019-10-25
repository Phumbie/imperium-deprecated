<template>
  <div id="nav-container">
    <div class="top-section">
      <router-link to="/my-account" class="nav-item">
        Account
      </router-link>
      <div class="product-title">Alt Power</div>
      <router-link to="/cart" class="nav-item">
        Shopping cart ({{ cartCounter === 0 ? "..." : cartCounter }})
      </router-link>
    </div>
    <div class="bottom-section">
      <a 
        href="https://renewable-calculator.surge.sh/" 
        target="blank" 
        class="nav-item1"
      >
        Energy Calculator
      </a>
      <router-link 
        to="/power-as-a-service" 
        class="nav-item2"
      >
        Buy Power
      </router-link>
      <router-link 
        to="/" 
        class="nav-item3"
      >
        Buy Products
      </router-link>
      <div class="nav-item4">
        Blog
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from "@/utils/api.js";

export default {
  name: 'TopNav',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'cartCounter',
    ])
  },
  mounted(){
    this.setCartCounter();
  },
  methods: {
    setCartCounter() {
    if(!localStorage.getItem("user_details") && !localStorage.getItem("product_id")) {
      let details = []
      let localCart = []
      let cartSize = 0;
      localStorage.setItem("product_id", JSON.stringify(details))
      localStorage.setItem("local_cart", JSON.stringify(localCart))

      this.$store.dispatch('setCartCounter', cartSize);
      return
    }
    if(!localStorage.getItem("user_details") && JSON.parse(localStorage.getItem("product_id"))) {
      let cartSize = 0;
      JSON.parse(localStorage.getItem("product_id")).map(item => {
        cartSize += item.quantity
      })
      this.$store.dispatch('setCartCounter', cartSize);
      return
    }
      api
        .getCart()
        .then(({ data }) => {
          if(data.status == "success"){
            let cartSize = 0;
            let cartItems = data.data.cart.items;
            cartItems.forEach(item => {
              cartSize += item.quantity;
            });
            this.$store.dispatch('setCartCounter', cartSize);
          }
        })
        .catch(({ response }) => {
          if(response){
            alert(response.data.message);
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
#nav-container{
  border: solid 1px #000000;
  width: 99.9%;
  // border-right: none;
  position: sticky;
  position: -webkit-sticky;
  margin-top: 38px;
  top: 0;
  z-index: 10;
  
  .top-section, .bottom-section{
    display: flex;
  }

  .top-section{
    border-bottom: solid 1px #000000;
  }

  .product-title {
    background: white;
    border-right: solid 1px #000000;
    border-left: solid 1px #000000;
    flex: 2;
    font-size: 32px;
    padding-top: 15px;
    padding-top: 25px;
    padding-bottom: 25px;
    text-align: center;
    color: black;
  }

  .nav-item, .nav-item1, .nav-item2, .nav-item3,.nav-item4 {
    flex: 1;
    background: white;
    padding-top: 25px;
    padding-bottom: 25px;
    text-align: center;
    text-decoration: none;
    color: black;
    transition: 0.5s;
    cursor: pointer;
  }

  .nav-item:hover, .nav-item1:hover, .nav-item2:hover, .nav-item3:hover, .nav-item4:hover{
    background: #000000;
    color: white;
    transition: 0.5s;
  }

  .nav-item1 {
    border-right: solid 1px #000000;
  }

  .nav-item2 {
    border-right: solid 1px #000000;
  }

  .nav-item3 {
    border-right: solid 1px #000000;
  }
}
</style>
