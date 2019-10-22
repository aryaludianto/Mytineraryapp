import { GET_PROFILE, LOAD_USERS } from './actions';
import axios from 'axios';

let config = {
  withCredentials: true,
  headers: { Authorization: 'Bearer ' + localStorage.getItem('user') }
};

export const getProfile = () => dispatch => {
  console.log(localStorage.getItem('user'));
  let emailOfUser = localStorage.getItem('email');
  console.log('is this emailOfUser from localStorage?', emailOfUser);
  axios
    .post('/profile/profiles', { emailOfUser: emailOfUser }, config)
    .then(res => {
      console.log(res);
      console.log('this is res.data', res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
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
