<template>
  <div id="paas-account-details">
    <modal name="modal-verify-statement" classes="modal-verify-statement">
      <div>test</div>
    </modal>
    <div class="form-box">
      <div class="header-text">Account details</div>
      <div class="small-text">We’ll need you to provide us with your account details.</div>
      <form action="">
        <input type="number" placeholder="BVN" class="text-field">
        <input type="text" placeholder="Bank name" class="text-field align-right">
        <input type="text" placeholder="Account number" class="text-field">
        <input type="text" placeholder="Sterling Bank (destination bank)" class="text-field align-right">
        <div class="text-small">we need this to help us generate your statements.</div>
        <router-link to="statement-confirmed" tag="button">Request statement</router-link>
      </form>
    </div> 
  </div> 
</template>

<script>
export default {
  data () {
    return {
    }
  },
  
  mounted(){
    // this.$modal.show('modal-verify-statement');
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

  .v--modal-overlay[data-modal="modal-verify-statement"] {
    background: rgba(0, 0, 0, 0.8);
  }

  .modal-verify-statement{
    display: none;
    color: blue;
    // // position: absolute !important;
    // padding-top: 20px;
    // padding-bottom: 20px;
    // width: 25% !important;
    // height: auto !important;
    // background: white; 
    // top: 43% !important;
    // left: 50% !important;
    // transform: translate(-50%, -50%) !important;
    // border-radius: 5px;

    div{
      float: left;
    }
  }
}
</style>
