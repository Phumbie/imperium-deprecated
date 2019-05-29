<template>
  <div id="signup-section">
    <form>
      <div 
        class="header-text-28" 
        @submit.prevent="signupCustomer()"
      >
        Signup
      </div>
      <input
        type="text"
        placeholder="First name"
        class="text-field width-half"
        required
      />
      <input
        type="text"
        placeholder="Last name"
        class="text-field width-half float-right"
        required
      />
      <input
        type="text"
        placeholder="Email address"
        class="text-field width-half"
        required
      />
      <input
        type="tel"
        placeholder="Phone number"
        class="text-field width-half float-right"
        required
      />
      <input
        type="password"
        placeholder="Password"
        class="text-field width-half"
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        class="text-field width-half float-right"
        required
      />
      <input type="text" placeholder="Street" class="text-field" required />
      <input
        type="text"
        placeholder="LGA"
        class="text-field width-half"
        required
      />
      <input
        type="text"
        placeholder="State"
        class="text-field width-half float-right"
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
      streetAddress: "",
      lga: "",
      state: ""
    };
  },
  methods: {
    signupCustomer() {
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
          return data;
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
