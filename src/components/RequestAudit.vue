<template>
  <div id="request-audit" class="container">
    <div class="left-side">
      <h3>Power as a service</h3>
      <p>
        At Imperium, we take care of all your power and energy concerns by
        empowering your homes, stores and businesses with our clean energy
        solutions. By selecting our “Power as a Service” option, you are
        guaranteed clean and reliable power without the burden and hassle of
        installing, maintaining or even owning a solar/power solution. Begin to
        enjoy power today at zero upfront cost. You only pay an agreed tariff
        based on the solution deployed.
      </p>
    </div>
    <div class="right-side">
      <form class="form" @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group">
            <label for="first name">First Name</label>
            <input
              type="text"
              v-model="formData.first_name"
              name=""
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="last name">Last Name</label>
            <input
              type="text"
              v-model="formData.last_name"
              name=""
              class="input-field"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              v-model="formData.email"
              name=""
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone number">Phone Number</label>
            <input
              type="number"
              v-model="formData.phone_number"
              name=""
              class="input-field"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="contact preference">Contact Preference</label>
            <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
            <select
              v-model="formData.contact_reference"
              class="input-field"
              required
            >
              <option value="" selected disabled></option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="phone-email">Both Phone and Email</option>
            </select>
          </div>
          <div class="form-group">
            <label for="contact date">Contact Date</label>
            <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
            <Datepicker
              :wrapper-class="'vue-datepicker'"
              :input-class="'vue-datepicker-input'"
              :disabled-dates="disabledDates"
              :highlighted="highlightedDay"
              v-model="formData.contact_date"
              name="date"
            ></Datepicker>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="house number">House number</label>
            <input
              type="text"
              v-model="formData.address.house_number"
              name=""
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="street name">Street name</label>
            <input
              type="text"
              v-model="formData.address.street"
              name=""
              class="input-field"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="local government area">LGA</label>
            <input
              type="text"
              v-model="formData.address.lga"
              name=""
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="state">State</label>
            <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
            <select
              name="state"
              class="input-field"
              required
              v-model="formData.address.state"
            >
              <option value="" selected disabled></option>
              <option value="Abuja FCT">Abuja FCT</option>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="Akwa Ibom">Akwa Ibom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nassarawa">Nassarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamfara</option>
              <option value="Outside Nigeria">Outside Nigeria</option>
            </select>
          </div>
        </div>
        <div class="btn-full-green">
          <button>Send Request</button>
          <small
            >By clicking the button, you agree to be contacted by the Imperium
            team.</small
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";
import api from "@/utils/api.js";
export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      // selectedCity: "",
      // selectedState: "",
      // selectedContactMode: "",
      // selectedDate: "",
      disabledDates: {
        to: "",
      },
      highlightedDay: {
        dates: [],
      },
      formData: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        contact_reference: "",
        contact_date: "",
        address: {
          house_number: "",
          street: "",
          lga: "",
          state: "",
        },
      },
    };
  },
  created() {
    this.presentDate();
  },
  methods: {
    ...mapActions("notificationModule", ["showToast"]),
    goTo(page) {
      this.$router.push(page);
    },
    presentDate() {
      let dateObj = new Date();
      let month = dateObj.getMonth();
      let day = String(dateObj.getDate()).padStart(2, "0");
      let year = dateObj.getFullYear();
      this.disabledDates.to = new Date(year, month, day);
      this.highlightedDay.dates = [new Date(year, month, day)];
    },
    submit(event) {
      api
        .sendAuditForm(this.formData)
        .then((response) => {
          this.showToast({
            description: "Audit request sent",
            display: true,
            type: "success",
          });
          event.target.reset();
        })
        .catch(({ response }) => {
          this.showToast({
            description: "An error occured",
            display: true,
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#request-audit {
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  column-gap: 5rem;
  margin-top: 5rem;

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 2fr;
    column-gap: 3rem;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
    margin-top: 0rem;
  }

  .left-side {
    h3 {
      font-size: 1.75rem;
      font-weight: 500;
      color: #1d1d1d;

      @media screen and (max-width: 900px) {
        text-align: center;
      }
    }

    p {
      font-size: 16px;
      color: #616161;
      line-height: 1.7;
    }
  }

  .right-side {
    display: flex;
    justify-content: center;

    .form {
      width: 95%;

      @media screen and (max-width: 900px) {
        width: 100%;
        margin-top: 5rem;
      }

      .form-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;

        @media screen and (max-width: 680px) {
          grid-template-columns: 1fr;
        }

        .form-group {
          position: relative;

          label {
            color: #616161;
            font-size: 14px;
          }

          img {
            position: absolute;
            top: 2.1rem;
            right: 0.5rem;
            z-index: -10;
          }

          .input-field {
            font-size: 1rem;
            border: 1px solid #1d1d1d;
            padding: 0.6rem 0 0.6rem 0.6rem;
            margin: 0.5rem 0 2rem 0;
          }

          input {
            width: 96.5%;

            @media screen and (max-width: 680px) {
              width: 97%;
            }
          }
        }
      }

      .btn-full-green {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1.6rem;

        button {
          width: 100%;
          color: #ffffff;
          font-size: 1rem;
          background: #59a358;
          border: none;
          padding: 1rem 0;
          margin-bottom: 0.5rem;
          cursor: pointer;
        }

        small {
          text-align: center;
        }
      }
    }
  }
}
</style>
<style lang="scss">
// for vue date picker classes to take effect, the scoped attribute has to be removed
.vue-datepicker {
  border: 1px solid #1d1d1d;
  // background: #f9fafb;
  padding: 0.5rem;
  margin-top: 0.4rem;

  @media screen and (max-width: 680px) {
    margin: 0.5rem 0 2rem 0;
  }
  // border-radius: 5px;

  .vue-datepicker-input {
    width: 100%;
    border: none;
    outline: none;
    // color: #414b55;
    // background-color: transparent;
  }
}
</style>
