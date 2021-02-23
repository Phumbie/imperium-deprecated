<template>
  <div id="container-main">
    <top-nav />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

export default {
  components: {
    TopNav,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
