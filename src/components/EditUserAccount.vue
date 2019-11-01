<template>
  <div id="edit-account">
    <!-- <div class="header-text-28">My Account</div>
    <button class="button-logout small-text" @click="logout()">Logout</button>-->
    <div id="edit-section">
      <form @submit.prevent="signupCustomer()">
        <div class="header-text-28">Personal Details</div>
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

        <div class="header-text-28">Address Details</div>
        <input
          type="text"
          placeholder="Street"
          class="text-field street-width"
          v-model="streetAddress"
          required
        />
        <input type="text" placeholder="LGA" class="text-field width-half" v-model="lga" required />
        <input
          type="text"
          placeholder="State"
          class="text-field width-half float-right"
          v-model="state"
          required
        />
        <div class="change-password">
          <!-- <div class="header-text-28 change-password-child">Security</div> -->
          <div class="header-text-28 change-password-child" @click="show=!show">Change Password</div>
        </div>
        <div class v-if="show">
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
        <div class="buttons">
          <button class="btn">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      streetAddress: "",
      lga: "",
      state: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.navigateTo("login");
    },
    navigateTo(page) {
      this.$router.push(page);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>