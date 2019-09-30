// eslint-disable-next-line no-unused-vars
import { SET_USERS, ADD_USER } from './actions'
import axios from 'axios';


export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}


export function fetchUsers(email) {
  return dispatch => {
    // eslint-disable-next-line quotes
    fetch(`/users/${email}`)
      .then(res => res.json())
      .then(email => dispatch(setUsers(email)))
  }
}


// export function userSignupRequest(user) {
//   console.log(user)
//   return dispatch => {
//     fetch('/users/', {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user)
//     }).then(user => dispatch(addUser(user)))
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }


// export function userSignupRequest(formData) {
//   console.log(formData);  
//   return dispatch => {
//     axios
//       .post('/users/', formData)
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//         dispatch(addUser(formData))
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// }


export const userSignupRequest = formData => dispatch => {
  console.log(formData);
  
  // const config = {
  //   headers: { 'content-type': 'multipart/form-data' }
  // }

  axios
    .post('/users/', formData)
    .then(res => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: ADD_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};






// export function userSignupRequest(user) {
// console.log(user)
//   return dispatch => {
//     fetch('/users/', {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user)
//     }).then(user => dispatch(addUser(user)))
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }

//Adding google auth

// export const oauthGoogle = accessToken => {
//   return async dispatch => {
//     console.log('we received', accessToken);
//     const res = await fetch('/auth/googlelogin', {
//       method:'post',
//       access_token: accessToken
//     });
//     dispatch({
//       type: ADD_USER,
//       payload: res.data
//     });
//     console.log('res', res);
//     localStorage.setItem('user', res.data.token);
//     localStorage.setItem('email', res.data.user.email);
//   };
// };