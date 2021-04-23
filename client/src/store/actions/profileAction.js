import { GET_PROFILE, LOAD_USERS } from './actions';
import axios from 'axios';

import { getProfileFunction } from '../general/profile'

export const getProfile = () => dispatch => {
  const dispatchCallback = (res) => {
    dispatch({
      type: GET_PROFILE,
      payload: res
    })
  };
  getProfileFunction(dispatchCallback)
};


export const getUsers = () => dispatch => {
  axios
    .get('/users')
    .then(res => {
      dispatch({
        type: LOAD_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.error(err)
    })
}
