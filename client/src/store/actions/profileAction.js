import { GET_PROFILE, LOAD_USERS } from './actions';
import axios from 'axios';

let config = {
  withCredentials: true,
  headers: { Authorization: 'Bearer ' + localStorage.getItem('user') }
};

export const getProfile = () => dispatch => {
  const emailOfUser = localStorage.getItem('email');

  axios
    .post('/profile/profiles', { emailOfUser: emailOfUser }, config)
    .then(res => {
      // console.log('get profile success')
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      // console.log('error from get profile');
      console.log(err);
    });
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
      console.log(err)
    })
}
