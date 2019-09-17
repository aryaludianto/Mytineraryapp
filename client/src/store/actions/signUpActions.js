// eslint-disable-next-line no-unused-vars
import { SET_USERS, ADD_USER, DELETE_USER, EDIT_USER, PICK_USER } from './actions'

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



export function userSignupRequest(user) {
  return dispatch => {
    fetch('/users/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(user => dispatch(addUser(user)))
  }
}

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