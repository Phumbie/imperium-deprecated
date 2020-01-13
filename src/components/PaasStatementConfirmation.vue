<template>
  <div id="paas-statement-confirmed">
    <div class="center-box">
      <img src="../assets/images/img-home.svg" />
      <div class="big-text">You’ve got mail!</div>
      <div
        class="eligibility-text"
      >Your eligibility test results have been emailed to johndoe@example.com</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.center-box {
  padding-top: 100px !important;
  padding-bottom: 100px !important;

  img {
    margin: 0 auto;
    display: block;
    width: 142px;
    height: 98px;
    object-fit: contain;
    margin-bottom: 30px;
  }

  .big-text {
    text-align: center;
    color: #181c52;
    font-size: 22px;
  }

  .eligibility-text {
    width: 80%;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    color: #02337a;
    line-height: 1.63;
  }
}
</style>
