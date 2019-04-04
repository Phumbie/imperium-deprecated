<template>
  <div id="paas-account-details">
    <div class="form-box">
      <div class="header-text">Account details</div>
      <div class="small-text">We’ll need you to provide us with your account details.</div>
      <form action="">
        <input type="number" placeholder="BVN" class="text-field">
        <input type="text" placeholder="Bank name" class="text-field align-right">
        <input type="text" placeholder="Account number" class="text-field">
        <input type="text" placeholder="Sterling Bank (destination bank)" class="text-field align-right">
        <div class="text-small">we need this to help us generate your statements.</div>
        <button>Request statement</button>
      </form>
    </div> 
  </div> 
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#paas-account-details{ 
  .text-small{
    font-size: 13px;
    line-height: 1.33;
    letter-spacing: 0.3px;
    color: #919eab;
  }
}
</style>
