<template>
  <div id="app">
    <!-- <transition name="show"> -->
    <Toast />
    <!-- </transition> -->
    <router-view />
  </div>
</template>

<script>
  import Toast from "@/components/Notification/Toast/Toast";
  export default {
    components: { Toast },
    name: "App",
    data() {
      return {
        // showToast: false,
      };
    },
    // watch: {
    //   showToast(val) {
    //     if (this.showToast === true) {
    //       setTimeout(() => {
    //         return this.$store.dispatch("notificationModule/showToast", {
    //           description: "",
    //           display: false,
    //           type: "",
    //         });
    //       }, 2000);
    //     }
    //   },
    // },
    // computed: {
    //   showToast: {
    //     get() {
    //       return this.$store.state.notificationModule.toast.display;
    //     },
    //     set(newValue) {
    //       return this.$store.dispatch("notificationModule/showToast", newValue);
    //     },
    //   },
    // },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/scss/main.scss";

  // .show-enter-active {
  //   transition: all 0.3s ease-in;
  // }
  // .show-leave-active {
  //   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  // }
  // .show-enter, .show-leave-to /* .fade-leave-active below version 2.1.8 */ {
  //   transform: translateY(-100px);
  //   opacity: 0;
  // }
</style>
