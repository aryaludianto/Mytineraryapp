import { GET_FAVOURITES } from '../actions/actions';
import axios from 'axios';

export const addToFavourites = (itineraryFavourite, user) => dispatch => {
  console.log('user', user, 'itineraryFavourite', itineraryFavourite);
  axios
    .put('/itineraries/itineraries/favourite', {
      itineraryFavourite: itineraryFavourite,
      user: user
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_FAVOURITES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};


export const getFavourites = user => dispatch => {
  console.log('the user of get favourites action', user);
  axios
    .post('/favourite/getfavourites', {
      user: user
    })
    .then(res => {
      // console.log(
      //   'Itineraries --> ',
      //   res.data
      // );
      dispatch({
        type: GET_FAVOURITES,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};








export const removeFavourite = (id, user) => dispatch => {
  axios
    .post('/favourite/deleteFavourite', { id: id, user: user })
    .then(res => {
      console.log('this should be the itineraries after deleting', res.data);
      dispatch({
        type: GET_FAVOURITES,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
