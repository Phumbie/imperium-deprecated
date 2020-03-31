<template>
  <div id="signup-section">
    <div class="header-text-28">Signup</div>
    <form @submit.prevent="signupCustomer()">
      <input
        type="text"
        placeholder="First name"
        required
        v-model="firstName"
      />
      <input type="text" placeholder="Last name" v-model="lastName" required />
      <input type="text" placeholder="Email address" v-model="email" required />
      <input
        type="tel"
        placeholder="Phone number"
        v-model="phoneNumber"
        required
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        minlength="6"
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        v-model="confirmPassword"
        minlength="6"
        required
      />
      <div class="address">
        <input
          type="text"
          placeholder="Street"
          v-model="streetAddress"
          required
        />
        <input type="text" placeholder="LGA" v-model="lga" required />
        <input type="text" placeholder="State" v-model="state" required />
      </div>
      <div class="buttons">
        <input type="submit" value="Create account" />
        <button @click="navigateTo('/login')">
          Login
        </button>
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
      if (this.password != this.confirmPassword) {
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
          if (data.status == "success") {
            alert("signup successful");
            localStorage.setItem(
              "user_details",
              JSON.stringify(data.data.customer)
            );
            localStorage.setItem("token", data.data.token);
            this.navigateTo("my-account");
          }
          if (JSON.parse(localStorage.getItem("product_id"))) {
            let localCart = JSON.parse(localStorage.getItem("product_id"));
            localCart.map(item => {
              api
                .addProductToCart(item.id)
                .then(({ data }) => {
                  this.$store.dispatch("incrementCartCounter");
                  alert("Successfully added product to cart!");
                })
                .catch(({ response }) => {
                  alert(response.data.message);
                });
            });
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
  form {
    width: 49%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width: 1200px) {
      width: 70%;
    }

    @media screen and (max-width: 900px) {
      width: 100%;
    }

    input {
      width: 49%;

      @media screen and (max-width: 600px) {
        width: 100%;
      }
    }

    .address {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 3rem;

      input {
        width: 49%;
        @media screen and (max-width: 600px) {
          width: 100%;
        }
      }
    }

    input[placeholder="Street"] {
      width: 100%;
    }
  }
}
</style>
