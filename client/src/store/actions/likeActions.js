import { LIKE_ITINERARY } from './actions';
import axios from 'axios';

export const likeItinerary = () => dispatch => {

  axios
    .get('/users')
    .then(res => {
      dispatch({
        type:LIKE_ITINERARY,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    })
}
