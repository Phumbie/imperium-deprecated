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
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        class="text-field width-half float-right"
        v-model="confirmPassword"
        required
      />
      <input 
        type="text" 
        placeholder="Street" 
        class="text-field" 
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

      return api
        .signupCustomer(data)
        .then(({ data }) => {
          console.log(data);
          alert(data.message);
        })
        .catch(({ response }) => {
          console.log(response.data.message);
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
