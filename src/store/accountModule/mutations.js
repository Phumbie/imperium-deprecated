export const SET_CONFIRM_PASSWORD = (state, payload) => {
  state.confirmPassword = payload;
};

export const CLEAR_SIGNUP_DETAILS = (state, payload) => {
  state.signipDetails = payload.signupDetails;
  state.confirmPassword = payload.confirmPassword;
};

export const CLEAR_LOGIN_DETAILS = (state, payload) => {
  state.loginDetails = payload.loginDetails;
};

export const VALIDATE_INPUT = (state, payload) => {
  switch (payload.field) {
    case "First name":
      state.formValidation.first_name = payload.invalid;
      break;
    case "Last name":
      state.formValidation.last_name = payload.invalid;
      break;
    case "Email address":
      state.formValidation.email = payload.invalid;
      break;
    case "Phone number":
      state.formValidation.phone_number = payload.invalid;
      break;
    case "Password":
      state.formValidation.password = payload.invalid;
      break;
    case "Confirm password":
      state.formValidation.confirmPassword = payload.invalid;
      break;
    case "Street":
      state.formValidation.address.street = payload.invalid;
      break;
    case "LGA":
      state.formValidation.address.lga = payload.invalid;
      break;
    case "State":
      state.formValidation.address.state = payload.invalid;
      break;

    default:
      break;
  }
};
