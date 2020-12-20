<template>
  <div id="signup-section">
    <div class="header-text-28">Signup</div>
    <form @submit.prevent="signup()">
      <input
        type="text"
        placeholder="First name"
        v-model="details.first_name"
        @input="validateInput"
        @blur="validateInput"
        :class="{
          invalid: formValidation.first_name === true,
        }"
        required
      />
      <input
        type="text"
        placeholder="Last name"
        v-model="details.last_name"
        @input="validateInput"
        @blur="validateInput"
        :class="{
          invalid: formValidation.last_name === true,
        }"
        required
      />
      <input
        type="email"
        placeholder="Email address"
        v-model="details.email"
        @input="validateInput"
        @blur="validateInput"
        :class="{
          invalid: formValidation.email === true,
        }"
        required
      />
      <input
        type="tel"
        placeholder="Phone number"
        v-model="details.phone_number"
        @blur="validateInput"
        @keypress="isNumber($event)"
        :class="{
          invalid: formValidation.phone_number === true,
        }"
        pattern="[0-9]*"
        inputmode="numeric"
        required
      />
      <input
        type="password"
        placeholder="Password"
        v-model="details.password"
        @blur="validateInput"
        :class="{
          invalid: formValidation.password === true,
        }"
        minlength="6"
        required
      />
      <input
        type="password"
        placeholder="Confirm password"
        v-model="confirmPassword"
        @blur="validateInput"
        :class="{
          invalid: formValidation.confirmPassword === true,
          disabled: details.password.length < 6,
        }"
        minlength="6"
        required
        :disabled="details.password.length < 6"
      />
      <div class="address">
        <input
          type="text"
          placeholder="Street"
          v-model="details.address.street"
          @blur="validateInput"
          :class="{
            invalid: formValidation.address.street === true,
          }"
          required
        />
        <input
          type="text"
          placeholder="LGA"
          v-model="details.address.lga"
          @blur="validateInput"
          :class="{
            invalid: formValidation.address.lga === true,
          }"
          required
        />
        <input
          type="text"
          placeholder="State"
          v-model="details.address.state"
          @blur="validateInput"
          :class="{
            invalid: formValidation.address.state === true,
          }"
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
    return {};
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.accountModule.signipDetails,
      formValidation: (state) => state.accountModule.formValidation,
    }),
    confirmPassword: {
      get() {
        return this.$store.state.accountModule.confirmPassword;
      },
      set(newValue) {
        return this.$store.dispatch(
          "accountModule/setConfirmPassword",
          newValue
        );
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
  },
  methods: {
    ...mapActions("notificationModule", ["showModal"]),
    ...mapActions("accountModule", ["signupCustomer", "validate"]),
    navigateTo(page) {
      this.$router.push(page);
    },
    signup() {
      if (Object.values(this.formValidation).includes(true)) {
        this.showModal({
          description: "invalid input detected, please fill form correctly.",
          display: true,
          type: "error",
        });
      } else {
        this.signupCustomer(this.details);
      }
    },
    validateInput() {
      let field = event.target.attributes.placeholder.value;
      switch (field) {
        case "First name":
          if (
            this.details.first_name.length === 0 ||
            this.details.first_name.indexOf(" ") >= 0
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Last name":
          if (
            this.details.last_name.length === 0 ||
            this.details.last_name.indexOf(" ") >= 0
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Email address":
          if (
            this.details.email.length === 0 ||
            this.details.email.indexOf(" ") >= 0
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Phone number":
          if (
            this.details.phone_number.length === 0 ||
            !this.details.phone_number.match(/0[7-9][0-1]\d{8}(?!.)/)
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Password":
          if (this.details.password.length < 6) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Confirm password":
          if (
            this.confirmPassword.length < 6 ||
            this.confirmPassword !== this.details.password
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Street":
          if (
            this.details.address.street.length === 0 ||
            !this.details.address.street.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "LGA":
          if (
            this.details.address.lga.length === 0 ||
            !this.details.address.lga.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "State":
          if (
            this.details.address.state.length === 0 ||
            !this.details.address.state.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;

        default:
          break;
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

    .invalid {
      border: 1px solid #dc3545;
    }

    .disabled {
      border: 1px solid rgba(0, 0, 0, 0.2);

      &::placeholder {
        color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
