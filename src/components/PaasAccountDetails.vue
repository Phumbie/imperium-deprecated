<template>
  <div id="paas-account-details">
  <modal name="modal-verify-statement" :clickToClose="false" width= "480" height= "400" class="modal-verify-statement">
    <div class="content">
      <div class="header-text">Verify statement</div>
      <div class="desc-text">Please provide the ticket number and password sent to your registered email and phone number to verify your statement.</div>
      <form @submit.prevent="goToPage('statement-confirmed')">
        <input type="text" placeholder="Ticket number" class="text-field">
        <input type="password" placeholder="Password" class="text-field">
        <input type="submit" value="Submit" class="button-submit">
      </form>
    </div>
  </modal>
  <div class="form-box">
      <div class="header-text">Account details</div>
      <div class="small-text">We’ll need you to provide us with your account details.</div>
       <form @submit.prevent="showStatementVerificatioModal()">
        <input type="number" placeholder="BVN" class="text-field">
        <input type="text" placeholder="Bank name" class="text-field align-right">
        <input type="text" placeholder="Account number" class="text-field">
        <input type="text" placeholder="Sterling Bank (destination bank)" class="text-field align-right">
        <div class="text-small">we need this to help us generate your statements.</div>
        <input type="submit" value="Submit" class="button-submit">
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

  methods: {
    goToPage(page) {
      this.$router.push(page); 
    },

    showStatementVerificatioModal(){
      this.$modal.show('modal-verify-statement');
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

  .v--modal-overlay[data-modal="modal-verify-statement"] {
    background: rgba(0, 0, 0, 0.8);
  }

  .modal-verify-statement{
    .content{
      width: 80%;
      margin: 0 auto;
      padding-top: 40px;
      color: #181c52;

       .header-text{
        font-size: 24px;
        font-weight: 500;
      }

      .desc-text{
        font-size: 15px;
        margin-top: 25px;
        line-height: 1.57;
        letter-spacing: 0.2px;
        margin-bottom: 20px;
      }

      .text-field{
        width: 100%;
        margin-bottom: 23px;
        box-sizing: border-box;
        height: 35px;
        border-radius: 3px;
        background-color: #e3e6e977;
        padding-left: 17px;
        border: none;
        font-size: 14px;
      }

      .button-submit{
        width: 100%;
        border-radius: 3px;
        background-color: #1b8d19;
        color: white;
        border: none;
        padding-top: 12px;
        padding-bottom: 12px;
        font-size: 15px;
        margin-top: 15px;
        cursor: pointer;
      }
    }
  
  }

}
</style>
