<template>
  <div id="specta">
    <p>Please hold on while we confirm payment</p>
    <content-loader class="specta-loader">
      <div class="loader"></div>
    </content-loader>
  </div>
</template>

<script>
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
          this.$swal.fire({
            position: "top",
            icon: "success",
            width: 280,
            html: "your order is being processed",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.$router.push("/products");
        } else {
          this.$swal.fire({
            position: "top",
            icon: "success",
            width: 280,
            html: "your payment was not successful",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.$router.push("/checkout");
        }
      })
      .catch((error) => {
        alert(error);
        this.$router.push("/checkout");
      });
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
