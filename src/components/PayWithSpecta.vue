<template>
  <div id="specta" class="container">
    <content-loader class="specta-loader">
      <p>Please hold on while we confirm payment.</p>
      <div class="loader"></div>
    </content-loader>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import api from "@/utils/api.js";
import contentLoader from "@/components/contentLoader";
export default {
  name: "PayWIthSpecta",
  components: {
    contentLoader,
  },
  beforeRouteEnter(to, from, next) {
    const { ref } = to.query;
    if (!ref) {
      return next("/checkout");
    }
    next();
  },
  mounted() {
    this.verifyLto();
  },
  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),

    verifyLto() {
      let ref = this.$route.query.ref;
      let data = {
        verificationToken: ref,
      };
      api
        .spectaVerifyPayment(data)
        .then(({ data }) => {
          const {
            result: { message },
          } = data.data;
          switch (message) {
            case "Completed":
              this.showToast({
                description: "Your order is being processed.",
                display: true,
                type: "success",
              });
              this.$router.push("/products/1");
              break;
            case "Failed":
              this.showModal({
                description: "Your loan request was not successful.",
                display: true,
                type: "error",
              });

              this.$router.push("/checkout");
              break;
            default:
              alert("an error occured");
              break;
          }
        })
        .catch((error) => {
          this.showModal({
            description:
              "We're having issues verifying you loan payment, please contact support.",
            display: true,
            type: "error",
          });
          this.$router.push("/checkout");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#specta {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  .specta-loader {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin-bottom: 2rem;
    }
  }
}
</style>
