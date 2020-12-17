<template>
  <div id="signup-section">
    <div class="header-text-28">Signup</div>
    <form @submit.prevent="signupCustomer()">
      <input
        type="text"
        placeholder="First name"
        required
        v-model="details.first_name"
      />
      <input
        type="text"
        placeholder="Last name"
        v-model="details.last_name"
        required
      />
      <input
        type="text"
        placeholder="Email address"
        v-model="details.email"
        required
      />
      <input
        type="tel"
        placeholder="Phone number"
        v-model="details.phone_number"
        @keypress="isNumber($event)"
        pattern="[0-9]*"
        inputmode="numeric"
        required
      />
      <input
        type="password"
        placeholder="Password"
        v-model="details.password"
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
          v-model="details.address.street"
          required
        />
        <input
          type="text"
          placeholder="LGA"
          v-model="details.address.lga"
          required
        />
        <input
          type="text"
          placeholder="State"
          v-model="details.address.state"
          required
        />
      </div>
      <div class="buttons">
        <button class="login-btn">
          <span>Create Account</span><span class="loader" v-if="loading"></span>
        </button>
        <button @click="navigateTo('/login')">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import api from "@/utils/api.js";

  export default {
    name: "Signup",
    data() {
      return {
        details: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          phone_number: "",
          address: {
            street: "",
            lga: "",
            state: "",
          },
        },
        confirmPassword: "",
      };
    },
    computed: {
      ...mapState({
        loading: (state) => state.loading,
      }),
    },
    methods: {
      ...mapActions("notificationModule", ["showModal"]),
      ...mapActions("accountModule", ["registerCustomer"]),
      ...mapActions(["setLoading"]),
      navigateTo(page) {
        this.$router.push(page);
      },
      signupCustomer() {
        if (!this.details.phone_number.match(/(234|0)[7-9][0-1][0-9]{8}/)) {
          this.showModal({
            description: "Phone number does not meet required pattern",
            display: true,
            type: "error",
          });
        } else if (this.details.phone_number.length !== 11) {
          this.showModal({
            description: "Phone Number must be 11 digits",
            display: true,
            type: "error",
          });
          return;
        } else if (this.details.password !== this.confirmPassword) {
          this.showModal({
            description: "Password field does not match password confirmation",
            display: true,
            type: "error",
          });
          return;
        } else {
          this.registerCustomer(this.details);
        }
      },
      isNumber(evt) {
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (
          (charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode !== 46) ||
          this.amount > 1000000
        ) {
          evt.preventDefault();
        } else {
          return true;
        }
      },
    },
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
