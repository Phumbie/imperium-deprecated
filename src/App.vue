<template>
  <div id="app">
    <Toast />
    <Modal />
    <router-view />
  </div>
</template>

<script>
import Toast from "@/components/Notification/Toast/Toast";
import Modal from "@/components/Notification/Modal/Modal";

export default {
  name: "App",
  components: {
    Toast,
    Modal,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/scss/main.scss";
</style>
