// eslint-disable-next-line no-unused-vars
import { SET_ITINERARIES } from './actions'

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

