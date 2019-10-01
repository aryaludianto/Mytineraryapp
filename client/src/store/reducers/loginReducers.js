import { AUTH_SIGN_UP, IS_LOGGED_IN } from '../actions/actions';

const initialState = {
  user: '',
  token: '',
  isAuthenticated: false,
  errorMessage: ''
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case AUTH_SIGN_UP:
    console.log('reducer AUTH_SIGN_UP');
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
      isAuthenticated: true,
      errorMessage: ''
    };
  case IS_LOGGED_IN:
    return action
  default:
    return state;
  }
}


export default loginReducer;