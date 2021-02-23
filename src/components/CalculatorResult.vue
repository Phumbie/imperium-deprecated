<template>
  <div id="calculator-result" class="container">
    <section class="result-container">
      <h2>Your result</h2>
      <div class="device-result" v-if="calculationType == 'device-based'">
        <div class="left">
          <div>
            <h3>{{ energyConsumption }}</h3>
            <p>Your energy consumption</p>
          </div>
        </div>
        <div class="right">
          <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
          <select name="" @change="onDeviceDurationChange($event)">
            <option value="Weekly">Weekly</option>
            <option value="Monthly" selected>Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div class="gen-result" v-else>
        <div class="left">
          <div>
            <h3>₦ {{ totalOperatingCost }}</h3>
            <p>Total operating cost</p>
          </div>
          <div>
            <h3>₦ {{ fuelCost }}</h3>
            <p>Total fueling cost</p>
          </div>
          <div>
            <h3>₦ {{ maintenanceCost }}</h3>
            <p>Total maintenance cost</p>
          </div>
        </div>
        <div class="right">
          <img src="@/assets/images/chevron-down.svg" alt="chevron icon" />
          <select name="" @change="onGenDurationChange($event)">
            <option value="Weekly">Weekly</option>
            <option value="Monthly" selected>Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      <router-link to="/request-audit" class="restart-calculator">
        Request audit
      </router-link>
    </section>
    <section class="products">
      <h2>Suggested products</h2>
      <div class="products-container">
        <ContentLoader v-if="loading">
          <div v-if="show" class="loader"></div>
          <span v-else>{{ contentLoaderText }}</span>
        </ContentLoader>
        <div class="products-group" v-else>
          <div
            class="product-box"
            v-for="(product, index) in suggestedProduct"
            :key="index"
            @click="navigateTo(`/product/${product.slug}/id/${product.id}`)"
          >
            <div class="centered-content">
              <div class="img-container">
                <img :src="product.display_image" />
              </div>
              <div class="product-name">{{ product.name | setUppercase }}</div>
              <p class="product-description">
                {{ product.description | shortenString | setUppercase }}
              </p>
              <div class="price">
                ₦ {{ product.price ? product.price.toLocaleString() : "" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/utils/api";
import shuffleArray from "@/utils/shuffleArray.js";
import ContentLoader from "@/components/contentLoader";

export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      totalOperatingCost: null,
      energyConsumption: 0,
      energyConsumptionPerMonth: 0,
      energyConsumptionPerWeek: 0,
      energyConsumptionPerYear: 0,
      fuelCost: null,
      fuelCostPerYear: null,
      fuelCostPerWeek: null,
      fuelCostPerMonth: 0,
      maintenanceCost: null,
      monthlyMaintenanceCost: null,
      yearlyMaintenanceCost: null,
      totalMaintenanceCost: null,
      weeklyMaintenanceCost: null,
      calculationType: null,
      totalCost: "",
      suggestedProduct: [],
      shopURL: process.env.VUE_APP_SHOP_URL,
      contentLoaderText: "Nothing to show",
      show: true,
      loading: true,
    };
  },
  mounted() {
    this.calculationType = localStorage.calculationType;

    if (this.calculationType == "device-based") {
      this.energyConsumption = localStorage.energyConsumptionPerMonth;
      this.energyConsumptionPerMonth = localStorage.energyConsumptionPerMonth;
      this.energyConsumptionPerWeek = localStorage.energyConsumptionPerWeek;
      this.energyConsumptionPerYear = localStorage.energyConsumptionPerYear;

      this.fuelCost = this.fuelCostPerYear = this.fuelCostPerWeek = this.fuelCostPerMonth =
        "Not applicable";
    } else {
      this.fuelCostPerMonth = localStorage.fuelCostPerMonth;
      this.fuelCostPerWeek = localStorage.fuelCostPerWeek;
      this.fuelCostPerYear = localStorage.fuelCostPerYear;

      this.monthlyMaintenanceCost = this.totalCost =
        localStorage.monthlyMaintenanceCost;
      this.yearlyMaintenanceCost = localStorage.yearlyMaintenanceCost;
      this.totalMaintenanceCost = localStorage.totalMaintenanceCost;
      this.weeklyMaintenanceCost = String(
        Math.round(parseInt(this.monthlyMaintenanceCost.replace(/,/g, "")) / 4)
      ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.fuelCost = this.fuelCostPerMonth;
      this.maintenanceCost = this.monthlyMaintenanceCost;

      this.totalOperatingCost = String(
        parseInt(this.fuelCost.replace(/,/g, "")) +
          parseInt(this.maintenanceCost.replace(/,/g, ""))
      ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    this.getProductByCategory();
  },
  methods: {
    goTo(page) {
      this.$router.push(page);
    },

    navigateTo(page) {
      this.$router.push(page);
    },

    getProductByCategory() {
      api
        .getSimilarProducts("bundle", 1000000)
        .then((response) => {
          if (response.data.data.result.length === 0) {
            this.show = false;
            return;
          }
          if (response.data.data.result.length < 4) {
            let emptyProductSpace = 4 - response.data.data.result.length;
            let emptyObject = {};
            let emptyProductArray = new Array(emptyProductSpace).fill(
              emptyObject
            );
            this.suggestedProduct = shuffleArray(
              response.data.data.result
            ).concat(emptyProductArray);
            this.loading = false;
          } else {
            this.suggestedProduct = shuffleArray(
              response.data.data.result
            ).slice(-4);
            this.loading = false;
          }
        })
        .catch(({ response }) => {
          alert(`${response.data.status}`);
        });
    },

    onConsumptionPerDurationChange(event) {
      if (event.target.value == "Monthly") {
        this.energyConsumption = this.energyConsumptionPerMonth;
      } else if (event.target.value == "Weekly") {
        this.energyConsumption = this.energyConsumptionPerWeek;
      } else {
        this.energyConsumption = this.energyConsumptionPerYear;
      }
    },

    onGenDurationChange(event) {
      if (event.target.value == "Monthly") {
        this.energyConsumption = this.energyConsumptionPerMonth;
        this.maintenanceCost = this.monthlyMaintenanceCost;
        this.fuelCost = this.fuelCostPerMonth;
      } else if (event.target.value == "Weekly") {
        this.energyConsumption = this.energyConsumptionPerWeek;
        this.maintenanceCost = this.weeklyMaintenanceCost;
        this.fuelCost = this.fuelCostPerWeek;
      } else {
        this.energyConsumption = this.energyConsumptionPerYear;
        this.maintenanceCost = this.yearlyMaintenanceCost;
        this.fuelCost = this.fuelCostPerYear;
      }

      this.totalOperatingCost = String(
        parseInt(this.fuelCost.replace(/,/g, "")) +
          parseInt(this.maintenanceCost.replace(/,/g, ""))
      ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    onDeviceDurationChange(event) {
      if (event.target.value == "Monthly") {
        this.energyConsumption = this.energyConsumptionPerMonth;
        this.maintenanceCost = this.monthlyMaintenanceCost;
        this.fuelCost = this.fuelCostPerMonth;
      } else if (event.target.value == "Weekly") {
        this.energyConsumption = this.energyConsumptionPerWeek;
        this.maintenanceCost = this.weeklyMaintenanceCost;
        this.fuelCost = this.fuelCostPerWeek;
      } else {
        this.energyConsumption = this.energyConsumptionPerYear;
        this.maintenanceCost = this.yearlyMaintenanceCost;
        this.fuelCost = this.fuelCostPerYear;
      }
    },

    onPaymentDuration(event) {
      if (event.target.value == "Monthly") {
        this.totalCost = this.monthlyMaintenanceCost;
      } else if (event.target.value == "Yearly") {
        this.totalCost = this.yearlyMaintenanceCost;
      }
      // else if(event.target.value == "Payment"){
      //   this.totalCost = "0,00";
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
#calculator-result {
  .result-container {
    margin-top: 4rem;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      color: #1d1d1d;
    }

    .device-result {
      display: grid;
      grid-template-columns: 3fr 1fr;
      column-gap: 3rem;
      margin-bottom: 1.6rem;

      @media screen and (max-width: 680px) {
        grid-template-columns: 1fr;
      }

      .left {
        border: 1px solid #1d1d1d;

        div {
          text-align: center;
          padding: 2rem 0;

          h3 {
            font-family: Gotham;
            font-size: 1.125rem;
            font-weight: 500;
            margin-block-start: 0;
            margin-block-end: 0;
          }

          p {
            color: #616161;
            margin-top: 0.6rem;
          }
        }
      }

      .right {
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        border: 1px solid #1d1d1d;

        @media screen and (max-width: 680px) {
          padding: 1rem 0;
          margin-top: 1.6rem;
        }

        img {
          position: absolute;
          top: 4.4rem;
          z-index: -10;

          @media screen and (max-width: 680px) {
            top: 2rem;
          }
        }

        select {
          text-align-last: center;
          font-size: 1.2rem;
        }
      }
    }

    .gen-result {
      display: grid;
      grid-template-columns: 3fr 1fr;
      column-gap: 3rem;
      margin-bottom: 1.6rem;

      @media screen and (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .left {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        border: 1px solid #1d1d1d;

        @media screen and (max-width: 900px) {
          grid-template-columns: 1fr 1fr;
        }

        div {
          text-align: center;
          padding: 2rem 0;

          h3 {
            font-family: Gotham;
            font-size: 1.125rem;
            font-weight: 500;
            margin-block-start: 0;
            margin-block-end: 0;
          }

          p {
            color: #616161;
            margin-top: 0.6rem;
          }

          &:nth-child(2) {
            border-left: 1px solid #1d1d1d;
            border-right: 1px solid #1d1d1d;

            @media screen and (max-width: 900px) {
              border-right: none;
            }
          }

          &:nth-child(3) {
            @media screen and (max-width: 900px) {
              grid-column-start: 1;
              grid-column-end: 3;
              border-top: solid 1px #1d1d1d;
            }
          }
        }
      }

      .right {
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        border: 1px solid #1d1d1d;

        @media screen and (max-width: 900px) {
          padding: 1rem 0;
          margin-top: 1.6rem;
        }

        img {
          position: absolute;
          top: 4.4rem;
          z-index: -10;

          @media screen and (max-width: 900px) {
            top: 2rem;
          }
        }

        select {
          text-align-last: center;
          font-size: 1.2rem;
        }
      }
    }

    .restart-calculator {
      text-decoration: none;
      color: #59a358;
    }
  }

  .products {
    margin-top: 5rem;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
    }
    .products-container {
      .products-group {
        border-top: solid 1px #000000;
        border-left: solid 1px #000000;
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @media screen and (max-width: 900px) {
          grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 480px) {
          grid-template-columns: 1fr;
        }

        .product-box {
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: solid 1px #000000;
          border-bottom: solid 1px black;
          padding-top: 2.125rem;
          cursor: pointer;

          .centered-content {
            width: 85%;
            max-height: 34.6rem;
            margin: 0 auto;

            animation-name: fadeIn;
            animation-iteration-count: 1;
            animation-timing-function: ease-in-out;
            animation-duration: 1s;
            animation-fill-mode: forwards;

            @keyframes fadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .img-container {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              height: 15rem;
              padding-bottom: 1.8rem;

              @media screen and (max-width: 900px) {
                height: 10rem;
              }

              img {
                width: 60%;
                position: relative;
                object-position: bottom;
                object-fit: contain;
                max-height: 100%;

                @media screen and (max-width: 900px) {
                  width: 60%;
                }
              }
            }

            .product-name {
              font-family: HelveticaNeue;
              font-size: 1.1rem;
              font-weight: 500;
              color: #000000;
              margin-top: 1.5rem;
              margin-bottom: 0.2rem;
              overflow: hidden;
            }

            .product-description {
              font-family: HelveticaNeue;
              font-size: 0.9rem;
              color: #000000;
              font-weight: 500;
              margin-bottom: 0.5rem;
              line-height: 1.4rem;
              opacity: 0.8;
              overflow: hidden;
            }

            .price {
              font-family: Gotham;
              font-size: 1.125rem;
              color: #000000;
              font-weight: 500;
              margin-bottom: 1.4rem;
              line-height: 1.4rem;
            }
          }
        }
      }
    }
  }
}
</style>
