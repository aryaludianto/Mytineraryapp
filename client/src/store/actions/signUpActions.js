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


export function fetchUsers(user) {
  return dispatch => {
    // eslint-disable-next-line quotes
    fetch(`/users/${user}`)
      .then(res => res.json())
      .then(user => dispatch(setUsers(user)))
  }
}


export function userSignupRequest(user) {
  return dispatch => {
    // eslint-disable-next-line quotes
    fetch(`/users/${user}`)
      .then(res => res.json())
      .then(user => dispatch(setUsers(user)))
  }
}
