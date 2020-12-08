<template>
  <div id="app">
    <Toast />
    <!-- <Modal :showModal="show" @closeModal="show = false">
      <h1>I'm a modal</h1>
    </Modal> -->
    <router-view />
  </div>
</template>

<script>
  import Toast from "@/components/Notification/Toast/Toast";
  export default {
    components: {
      Toast,
    },
    name: "App",
    data() {
      return {
        show: true,
        // showToast: false,
      };
    },
  };
</script>

<style lang="scss">
  @import "@/assets/styles/scss/main.scss";
</style>
