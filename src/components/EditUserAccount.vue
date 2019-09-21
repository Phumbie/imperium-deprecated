<template>
  <div id="user-account">
    <div class="header-text-28">My Account</div>
    <button class="button-logout small-text" @click="logout()">Logout</button>
    <div id="signup-section">
      <form @submit.prevent="signupCustomer()">
        <div class="header-text-28">Personal Details</div>
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
          class="dropdown width-half float-right" required>
          <option value="Gender" selected disabled>--Select Gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div class="header-text-28">Address Details</div>
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
          <div class="header-text-28 change-password-child">Security</div>
          <div class="header-text-28 change-password-child" @click="show=!show">
            Change Password
          </div>
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
    margin: 16px auto;
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

  .header-text-28{
    text-align: left;
    margin-top: 60px;
    height: 29px;
    font-size: 24px;
  }

  .text-field,
  .dropdown {
    height: 45px;
    width: 55px;
    font-family: Graphik;
    font-size: 14px;
    outline: none;
    letter-spacing: normal;
    color: #1d1d1d;
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

  .change-password-child{
    font-size: 18px;
    font-weight: 500;

    color: #1d1d1d;
  }

  .buttons{
    justify-content: start;
    margin-bottom: 2%;
    margin-top: 8.1%;
  }
  
  button{
    width: 30%;
  }
}

</style>