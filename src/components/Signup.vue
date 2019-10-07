<template>
  <div id="signup-section">
    <form @submit.prevent="signupCustomer()">
      <div 
        class="header-text-28" 
      >
        Signup
      </div>
      <input
        type="text"
        placeholder="First name"
        class="text-field width-half"
        required
        v-model="firstName"
      />
      <input
        type="text"
        placeholder="Last name"
        class="text-field width-half float-right"
        v-model="lastName"
        required
      />
      <input
        type="text"
        placeholder="Email address"
        class="text-field width-half"
        v-model="email"
        required
      />
      <input
        type="tel"
        placeholder="Phone number"
        class="text-field width-half float-right"
        v-model="phoneNumber"
        required
      />
      <input
        type="password"
        placeholder="Password"
        class="text-field width-half"
        v-model="password"
        minlength="6"
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        class="text-field width-half float-right"
        v-model="confirmPassword"
        minlength="6"
        required
      />
      <input 
        type="text" 
        placeholder="Street" 
        class="text-field" 
        v-model="streetAddress"
        required 
      />
      <input
        type="text"
        placeholder="LGA"
        class="text-field width-half"
        v-model="lga"
        required
      />
      <input
        type="text"
        placeholder="State"
        class="text-field width-half float-right"
        v-model="state"
        required
      />
      <div class="buttons">
        <button>Create account</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/utils/api.js";

export default {
  name: "Signup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      streetAddress: "",
      lga: "",
      state: ""
    };
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page); 
    },
    signupCustomer() {
      if(this.password != this.confirmPassword){
        alert("password field doesn't match password confirmation");
        return;
      }

      let data = {
        address: {
          street: this.streetAddress,
          lga: this.lga,
          state: this.state
        },
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        phone_number: this.phoneNumber
      };

      api
        .signupCustomer(data)
        .then(({ data }) => {
          if(data.status == "success"){
            alert("signup successful");
            localStorage.setItem('user_details', JSON.stringify(data.data.customer));
            localStorage.setItem('token', data.data.token)
            this.navigateTo("my-account");
          }
          if(JSON.parse(localStorage.getItem("product_id"))){
            let localCart = JSON.parse(localStorage.getItem("product_id"))
            localCart.map(item => {
            api
              .addProductToCart(item.id)
              .then(({ data }) => {
                this.$store.dispatch("incrementCartCounter");
                alert("Successfully added product to cart!");
              })
              .catch(({ response }) => {
                alert("Sorry boo, an error occured while adding to cart");
              });
            })
          }
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#signup-section {
  .width-half {
    width: 49%;
  }

  .float-right {
    float: right;
  }
}
</style>
