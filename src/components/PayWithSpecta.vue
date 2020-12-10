<template>
  <div id="specta">
    <p>Please hold on while we confirm payment</p>
    <content-loader class="specta-loader">
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
    let ref = this.$route.query.ref;
    let data = {
      verificationToken: ref,
    };
    api
      .spectaVerifyPayment(data)
      .then((data) => {
        if (data.data.result.message === "Completed") {
          this.showToast({
            description: "Your order is being processed",
            display: true,
            type: "success",
          });
          this.$router.push("/products");
        } else {
          this.showModal({
            description: "Your loan request was not successful.",
            display: true,
            type: "error",
          });
          this.$router.push("/checkout");
        }
      })
      .catch((error) => {
        alert(error);
        this.$router.push("/checkout");
      });
  },
  methods: {
    ...mapActions("notificationModule", ["showToast", "showModal"]),
  },
};
</script>
<style lang="scss" scoped>
#specta {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  .specta-loader {
    width: 90vw;
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
}
</style>
