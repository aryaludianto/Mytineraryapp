import { GET_FAVOURITES } from '../actions/actions';
import axios from 'axios';

export const addToFavourites = (itineraryFavorite, user) => dispatch => {
  axios
    .put('/itineraries/itineraries/favorite', {
      itineraryFavorite: itineraryFavorite,
      user: user
    })
    .then(res => {
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
    .post('/favorite/getfavorites', {
      user: user
    })
    .then(res => {
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
    .post('/favorite/deleteFavorite', { id: id, user: user })
    .then(res => {
      dispatch({
        type: GET_FAVOURITES,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
