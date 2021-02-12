<template>
  <div id="calculator" class="container">
    <section class="left">
      <div class="left-container">
        <div class="general-calculation" v-if="formGeneralIsActive">
          <img src="@/assets/images/home.png" class="img-home" />
          <div class="header-text">Generator Based</div>
          <div class="small-gray-text">
            Enter your energy consumption rate and we will recommend the best
            renewable energy providers for you.
          </div>
        </div>
        <div class="application-base" v-else>
          <img
            src="@/assets/images/appliances.png"
            class="img-appliance-small"
          />
          <div class="header-text">Appliance Based</div>
          <div class="small-gray-text">
            Enter your energy consumption rate and we will recommend the best
            renewable energy providers for you.
          </div>
        </div>
        <router-link to="/request-audit" class="btn">
          <button>Request Energy Audit</button>
        </router-link>
      </div>
    </section>
    <section class="center">
      <div class="form-box">
        <div class="form-header">
          <div class="header-text">Your Calculation</div>
          <button
            type="button"
            class="button-general bg-black"
            @click="switchFormToGeneral(true)"
            ref="generalBasedButton"
          >
            Generator Based
          </button>
          <button
            type="button"
            class="button-device-based"
            @click="switchFormToGeneral(false)"
            ref="deviceBasedButton"
          >
            Device Based
          </button>
        </div>
        <form
          v-if="formGeneralIsActive"
          @submit.prevent="computeGeneratorPrice()"
        >
          <div class="form-body">
            <div class="text-dropdown-field">
              <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
              <select
                class="full-width text-align-left"
                required
                @change="onChangeFuelType($event)"
              >
                <option value="" disabled selected class="disabled"
                  >Select fuel type</option
                >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
              </select>
            </div>
            <div class="form-label">What's your generator capacity?</div>
            <div class="text-dropdown-field">
              <input
                type="number"
                placeholder=""
                class="text-field"
                v-model="generator.size"
                required
              />
              <span>
                KVA
              </span>
            </div>
            <div class="form-label">
              What's your daily generator on-time?
            </div>
            <div class="text-dropdown-field">
              <input
                type="number"
                placeholder=""
                class="text-field"
                v-model="generator.on_time"
                required
              />
              <span>
                Hrs/day
              </span>
            </div>
            <!-- <div class="form-label" v-if="fuelType === 'diesel'">
              Percentage loading in gallons/hour?
            </div>
            <div class="text-dropdown-field" v-if="fuelType === 'diesel'">
              <select class="full-width text-align-left" required>
                <option value="" disabled selected></option>
                <option value="25">25%</option>
                <option value="50">50%</option>
                <option value="50">75%</option>
                <option value="50">100%</option>
              </select>
            </div> -->
            <div class="form-label">Period of usage in months</div>
            <div class="text-dropdown-field">
              <input
                type="number"
                placeholder=""
                class="text-field full-width"
                v-model="generator.period_of_usage"
                required
              />
            </div>
          </div>
          <Button class="btn-full-green">Compute</Button>
        </form>
        <form v-else @submit.prevent="addAppliance()">
          <div class="form-body">
            <div class="text-dropdown-field">
              <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
              <select
                class="full-width text-align-left"
                required
                ref="applianceName"
                @change="onDeviceItemChange($event)"
              >
                <option value="" disabled selected>Choose a device</option>
                <option v-for="(appliance, index) in appliances" :key="index">
                  {{ appliance.name }}
                </option>
              </select>
            </div>
            <div class="form-label">Power rating</div>
            <div class="text-dropdown-field">
              <input
                type="number"
                step="any"
                placeholder=""
                class="text-field"
                ref="capacityNum"
                v-model="capcityOfSelectedDevice"
                disabled
                required
              />
              <span ref="powerMeasurment">
                Watts
              </span>
            </div>
            <div class="form-label">Quantity</div>
            <div class="text-dropdown-field">
              <input
                type="number"
                placeholder=""
                class="text-field full-width"
                ref="quantity"
                required
              />
            </div>
            <div class="form-label">Hours of usage daily</div>
            <div class="text-dropdown-field">
              <input
                type="number"
                placeholder=""
                class="text-field full-width"
                ref="dailyUsageHours"
                required
              />
            </div>
          </div>
          <Button class="btn-full-green" ref="buttonAddAppliance">Add</Button>
        </form>
      </div>
    </section>
    <section class="right">
      <div class="form-box">
        <div class="form-body" v-if="formGeneralIsActive">
          <div class="header-text">Maintenance Info</div>
          <div class="form-label">Price of generator</div>
          <div class="text-dropdown-field">
            <input
              type="text"
              placeholder=""
              class="text-field"
              v-model="priceOfGenerator"
              readonly
            />
          </div>
          <div class="form-label">Monthly maintenace cost</div>
          <div class="text-dropdown-field">
            <input
              type="text"
              placeholder=""
              class="text-field"
              v-model="monthlyMaintenanceCost"
              readonly
            />
          </div>
          <div class="form-label">Cost of fuel per litre</div>
          <div class="text-dropdown-field fuel-price">
            <input
              type="text"
              placeholder=""
              class="text-field"
              v-model="costOfFuelPerLitre"
              readonly
            />
          </div>
        </div>
        <button
          class="btn-full-green"
          v-if="formGeneralIsActive && priceOfGenerator"
          @click="calculateCostAndEnergyConsumption()"
        >
          Suggested Product
        </button>
        <div id="appliances-list-view" class="form-body">
          <div class="header-text" v-if="!formGeneralIsActive">
            Your appliances
          </div>
          <div
            class="appliance-view-rect"
            v-for="(device, index) in devices"
            :key="index"
            v-bind:class="{ float_right: index % 2 > 0 }"
          >
            <img
              src="@/assets/images/close.svg"
              alt="close icon"
              class="icon-close"
              @click="removeAppliance(index)"
            />
            <div class="appliance-details">
              <div>{{ device.name }}</div>
              <span>{{ device.quantity }}</span
              ><span class="pipe">|</span> <span> {{ device.size }} kw</span
              ><span class="pipe">|</span
              ><span> {{ device.on_time }} hrs daily</span>
            </div>
          </div>
        </div>
        <button
          class="btn-full-green"
          v-if="!formGeneralIsActive"
          @click="calculateCostAndEnergyConsumption()"
        >
          Proceed
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../utils/api";

export default {
  data() {
    return {
      formGeneralIsActive: true,
      fuelType: false,
      costOfFuelPerLitre: "",
      priceOfGenerator: null,
      monthlyMaintenanceCost: null,
      pertrol_per_litre: null,
      diesel_per_litre: null,

      appliance: {
        size: null,
        name: "",
        on_time: 0,
        quantity: 0,
      },

      devices: [],
      appliances: null,
      capcityOfSelectedDevice: null,

      generator: {
        size: null,
        cost_per_litre: null,
        type: "",
        on_time: null,
        // name: "generator",
        // quantity: 1,
        period_of_usage: null,
        load: 0.25,
      },
    };
  },

  mounted() {
    this.getAppliances();
    this.getFuelCostPerLitre();
  },

  methods: {
    getAppliances() {
      api
        .getAppliance()
        .then((response) => {
          this.appliances = response.data.data;
        })
        .catch(({ response }) => {
          alert(`${response.data.status}`);
        });
    },

    getFuelCostPerLitre() {
      api
        .getFuelCostPerLitre()
        .then((response) => {
          this.pertrol_per_litre = response.data.data.GASOLINE_PER_LITRE;
          this.diesel_per_litre = response.data.data.DIESEL_PER_LITRE;
        })
        .catch(({ response }) => {
          alert(`${response.data.status}`);
        });
    },

    onDeviceItemChange(event) {
      this.capcityOfSelectedDevice = this.appliances[
        event.target.selectedIndex - 1
      ].rating;
    },

    onChangeFuelType(event) {
      this.fuelType = event.target.value;
      if (this.fuelType === "diesel") {
        this.costOfFuelPerLitre = "₦ " + this.diesel_per_litre + " / litre";
      } else if (this.fuelType === "petrol") {
        this.costOfFuelPerLitre = "₦ " + this.pertrol_per_litre + " / litre";
      } else {
        this.costOfFuelPerLitre = "";
      }
      this.generator.type = this.fuelType === "diesel" ? "diesel" : "gasoline";
    },

    computeGeneratorPrice() {
      const multiplier = this.fuelType === "diesel" ? 90000 : 30000;
      let genPrice = multiplier * this.generator.size;

      this.priceOfGenerator = genPrice.toLocaleString("NGN", {
        style: "currency",
        currency: "NGN",
      });
      this.priceOfGenerator =
        this.priceOfGenerator == "NGN 0.00" ? null : this.priceOfGenerator;

      this.monthlyMaintenanceCost = (0.015 * genPrice).toLocaleString("NGN", {
        style: "currency",
        currency: "NGN",
      });
      this.monthlyMaintenanceCost =
        this.monthlyMaintenanceCost == "NGN 0.00"
          ? null
          : this.monthlyMaintenanceCost;
    },

    clearGeneratorInputField() {
      this.generator.size = null;
      this.generator.on_time = null;
      this.generator.period_of_usage = null;
    },

    clearMaintenanceInfo() {
      this.priceOfGenerator = null;
      this.monthlyMaintenanceCost = null;
      this.costOfFuelPerLitre = "";
    },

    clearApplianceInputFields() {
      this.$refs.applianceName.selectedIndex = 0;
      this.$refs.capacityNum.value = this.$refs.powerMeasurment.value = this.$refs.quantity.value = this.$refs.dailyUsageHours.value = this.capcityOfSelectedDevice = null;
    },

    clearAddedAppliance() {
      this.devices = [];
    },

    switchFormToGeneral(val) {
      this.formGeneralIsActive = val;

      if (this.formGeneralIsActive) {
        this.$refs.generalBasedButton.classList.add("bg-black");
        this.$refs.deviceBasedButton.classList.remove("bg-black");
        this.clearApplianceInputFields();
        this.clearAddedAppliance();
      } else {
        this.$refs.deviceBasedButton.classList.add("bg-black");
        this.$refs.generalBasedButton.classList.remove("bg-black");
        this.clearGeneratorInputField();
        this.clearMaintenanceInfo();
      }
    },

    removeAppliance(index) {
      this.devices.splice(index, 1);
    },

    addAppliance() {
      let appliance = this.$refs.applianceName;
      let name = appliance.options[appliance.selectedIndex].value;
      let size = parseFloat(this.$refs.capacityNum.value);
      let quantity = parseInt(this.$refs.quantity.value);
      let on_time = parseInt(this.$refs.dailyUsageHours.value);
      this.appliance = { size, name, on_time, quantity };
      this.devices.push(this.appliance);
      this.clearApplianceInputFields();
    },

    onDieselPercentageLoadingChange(e) {
      this.generator.load = e.target.value / 100;
    },

    calculateCostAndEnergyConsumption() {
      if (this.formGeneralIsActive) {
        localStorage.calculationType = "genrator-based";
        api
          .costAndEnergyConsumptionGenerator(this.generator)
          .then(({ data }) => {
            localStorage.monthlyMaintenanceCost =
              data.data.monthlyMaintenanceCost;
            localStorage.yearlyMaintenanceCost =
              data.data.yearlyMaintenanceCost;
            localStorage.totalMaintenanceCost = data.data.totalMaintenanceCost;

            localStorage.fuelCostPerWeek = data.data.fuelCostPerWeek;
            localStorage.fuelCostPerMonth = data.data.fuelCostPerMonth;
            localStorage.fuelCostPerYear = data.data.fuelCostPerYear;

            this.$router.push("/calculator-result");
          })
          .catch(({ response }) => {
            alert(`${response.data.status}`);
          });
      } else {
        if (this.devices.length === 0) {
          alert("Please add devices");
          return;
        } else {
          localStorage.calculationType = "device-based";
          api
            .costAndEnergyConsumptionDevice({ devices: this.devices })
            .then(({ data }) => {
              localStorage.totalDeviceEnergy = data.data.totalDeviceEnergy;
              localStorage.energyConsumptionPerMonth =
                data.data.energyConsumptionPerMonth;
              localStorage.energyConsumptionPerWeek =
                data.data.energyConsumptionPerWeek;
              localStorage.energyConsumptionPerYear =
                data.data.energyConsumptionPerYear;

              this.$router.push("/calculator-result");
            })
            .catch(({ response }) => {
              alert(`${response.data.status}`);
            });
        }
      }
    },
  },

  watch: {
    // "generator.size": function() {
    //   this.computeGeneratorPrice();
    // },

    fuelType: function() {
      this.computeGeneratorPrice();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/scss/calculator.scss";
</style>
