<template>
  <div id="user-account">
    <div class="header-text-28">My Account</div>
    <button class="button-logout small-text" @click="logout()">Logout</button>
    <div id="signup-section">
      <form @submit.prevent="signupCustomer()">
        <div class="section-title">Personal Details</div>
          <input
            type="text"
            placeholder="Name"
            class="text-field width-half"
            required
            v-model="firstName"
          />
          <input
            type="text"
            placeholder="Email address"
            class="text-field width-half float-right"
            v-model="email"
            required
          />
        
        <input
          type="text"
          placeholder="Phone number"
          class="text-field width-half"
          v-model="lastName"
          required
        />
        <select name="gender"
          class="text-field width-half float-right" required>
          <option value="Gender" selected>--Select Gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div class="section-title">Address Details</div>
        <input 
          type="text" 
          placeholder="Street" 
          class="text-field street-width" 
          v-model="streetAddress"
          required 
        />
        <input
          type="text"
          placeholder="LGA"
          class="text-field width-half"
          v-model="lga"
          required
        />
        <input
          type="text"
          placeholder="State"
          class="text-field width-half float-right"
          v-model="state"
          required
        />
        <div class="change-password">
          <div class="section-title change-password-child">Security</div>
          <span>
            <div class="section-title change-password-child" @click="show=!show">
              Change Password
            </div>
          </span>
        </div>
        <div class="" v-if="show">
          <input
          type="password"
          placeholder="Old Password"
          class="text-field width-half"
          v-model="password"
          minlength="6"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          class="text-field width-half float-right"
          v-model="confirmPassword"
          minlength="6"
          required
        />
        </div>       
        <div class="buttons">
          <button class="">Save Changes</button>
        </div>
      </form>
  </div>
  </div>
</template>

<script>
export default {
    data () {
    return {
      show: false
    }
  },
    methods: {
    logout(){
      localStorage.clear();
      this.navigateTo('login');
    },
    navigateTo(page) {
      this.$router.push(page); 
    },
  }
}
</script>

<style lang='scss' scoped>
#user-account{
  .button-logout{
    width: 100px;
    // margin: 0 auto;
    background: transparent;
    border: none;
  }
}
#signup-section{
  border: solid 1px #000000;
  margin: 5% 0 5% 0;
  form{
    width: 80%;
    margin: 0 auto;
  }
  .section-title{
    margin-top: 60px;
    font-size: 19px;
  }
  .width-half {
    width: 48%;
  }
  .street-width{
    width: 100%;
  }
  .float-right {
    float: right;
  }
  .change-password{
    display: flex;
  }
  .change-password-child{
    flex: 1;
  }
  .change-password div:last-child{
    text-align: end;
    cursor: pointer;
  }
  .buttons{
    justify-content: start;
    margin-top: 7%;
  }
  button{
    width: 30%;
  }
}

</style>