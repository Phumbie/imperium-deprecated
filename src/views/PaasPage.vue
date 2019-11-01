<template>
  <div id="paas-page">
    <div class="nav">
      <div class="left-side">Imperium</div>
      <div class="right-side">
        <a href>Blog</a>
        <a href="https://renewable-calculator.surge.sh/" target="blank">Calculator</a>
        <router-link to="/product-catalogue" class="nav-item">Shop</router-link>
      </div>
    </div>
    <img src="@/assets/images/bg-wave-purple.svg" class="img-wave" />
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav";

export default {
  components: {
    TopNav
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#paas-page {
  .nav {
    width: 80%;
    margin: 0 auto;
    font-weight: 500;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    .left-side {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.8);
      width: 20%;
    }

    .right-side {
      width: 80%;

      a {
        float: right;
        margin-left: 50px;
        font-size: 15px;
        text-decoration: none;
        color: #343434d2;
      }
    }
  }

  .img-wave {
    position: absolute;
    width: 100%;
    z-index: -10;
    width: 100%;
    object-fit: contain;
    margin-top: 210px;
    // margin: 0;
    // top: 42%;
    // -ms-transform: translateY(-50%);
    // transform: translateY(-50%);
  }
}
</style>
