import { AUTH_SIGN_UP, LOG_OUT, IS_LOGGED_IN } from './actions';
import axios from "axios";

export const checkAccount = (email, password) => dispatch => {
  console.log('checking account', email, password);
  // let user = {
  //   email,
  //   password
  // }
  // fetch('/log/login', {
  //   method: 'post',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(user)
  // })
  axios
    .post('/log/login', { email, password })
    .then(res => {
      console.log(res);
      localStorage.setItem('user', res.data.token);
      localStorage.setItem('email', res.data.user.email);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const oauthGoogle = accessToken => {
  return async dispatch => {
    console.log('we received', accessToken);

    const res = await axios.post('/auth/googlelogin', {
      access_token: accessToken
    });

    // const res = await fetch('/auth/googlelogin', {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({'access_token': accessToken}) 
    // })

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data
    });
    console.log('res', res);
    localStorage.setItem('user', res.data.token);
    localStorage.setItem('email', res.data.user.email);
  };
};

// export const oauthFacebook = data => {
//   return async dispatch => {
//     console.log("we received", data);
//     const res = await axios.post("/auth/facebooklogin", {
//       access_token: data
//     });
//     dispatch({
//       type: AUTH_SIGN_UP,
//       payload: res.data
//     });
//     console.log("res", res);
//     localStorage.setItem("user", res.data.token);
//     localStorage.setItem("email", res.data.user.email);
//   };
// };



export function logout() {
  return dispatch => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    dispatch({
      type: LOG_OUT
    })
  }
}


export function isLoggedIn() {
  return dispatch => {
    let user = localStorage.getItem('user');
    if (user) {
      console.log("loggin from action")
      let isLoggedIn = true
      dispatch({
        type: IS_LOGGED_IN,
        isLoggedIn
      })
    } else {
      console.log("is log out from action")
      let isLoggedIn = false
      dispatch({
        type: IS_LOGGED_IN,
        isLoggedIn
      })
    }
  }
}
