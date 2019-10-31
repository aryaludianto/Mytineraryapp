// eslint-disable-next-line no-unused-vars
import { SET_ITINERARIES, ADD_ITINERARIES } from './actions'
import axios from 'axios';


export function setItineraries(itineraries) {
  return {
    type: SET_ITINERARIES,
    itineraries
  }
}

export function fetchItineraries(city) {
  return dispatch => {
    // eslint-disable-next-line quotes
    fetch(`/itineraries/${city}`)
      .then(res => res.json())
      .then(itineraries => dispatch(setItineraries(itineraries)))
  }
}



export const addItinerariesReq = data => dispatch => {

  console.log(data)

  axios.post('/itineraries', data)
    .then(res => {
      console.log(res);
      
      dispatch({
        type: ADD_ITINERARIES,
        payload: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    });
}