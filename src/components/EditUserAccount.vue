<template>
  <div id="edit-section">
    <div class="header-text-28">Update details</div>
    <form @submit.prevent="signupCustomer()">
      <input
        type="text"
        placeholder="First Name"
        class="text-field width-half"
        required
        v-model="firstName"
      />
      <input
        type="text"
        placeholder="Last Name"
        class="text-field width-half float-right"
        required
        v-model="lastName"
      />
      <input
        type="text"
        placeholder="Email address"
        class="text-field width-half float-right"
        v-model="email"
        required
      />

      <input
        type="text"
        placeholder="Phone number"
        class="text-field width-half"
        v-model="phoneNumber"
        required
      />

      <input
        type="text"
        placeholder="Street"
        class="text-field street-width"
        v-model="street"
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
      <div class="change-password">
        <div class="small-text" @click="show = !show">
          Change Password
        </div>
        <div class="change-password-input" v-if="show">
          <input
            type="password"
            placeholder="Old Password"
            class="text-field width-half"
            v-model="password"
            minlength="6"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            class="text-field width-half float-right"
            v-model="confirmPassword"
            minlength="6"
            required
          />
        </div>
      </div>
      <div class="buttons">
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      formDetails: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      street: "",
      lga: "",
      state: "",
      password: "",
      confirmPassword: ""
    };
  },
  mounted() {
    if (!localStorage.getItem("user_details")) {
      this.navigateTo("login");
      return;
    }
    this.getFormDetails();
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    getFormDetails() {
      this.formDetails = JSON.parse(localStorage.getItem("user_details"));
      this.firstName = this.formDetails.first_name;
      this.lastName = this.formDetails.last_name;
      this.email = this.formDetails.user.email;
      this.phoneNumber = this.formDetails.user.phone_number;
      this.street = this.formDetails.address.street;
      this.lga = this.formDetails.address.lga;
      this.state = this.formDetails.address.state;
    }
  }
};
</script>

<style lang="scss" scoped>
#edit-section {
  .small-text {
    width: 100%;
    margin: 1rem auto;
    text-align: center;
    font-size: 1.1rem;
    letter-spacing: 0.06rem;
    line-height: 1.8rem;
    text-align: start;
  }

  .small-text:hover {
    cursor: pointer;
  }
  form {
    width: 49%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    input {
      width: 49%;
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
      }
    }

    input[placeholder="Street"] {
      width: 100%;
    }

    .change-password {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
    }

    .change-password-input {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
