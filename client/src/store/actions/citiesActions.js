// eslint-disable-next-line no-unused-vars
import { SET_CITIES, ADD_CITIES, DELETE_CITIES, EDIT_CITIES, PICK_CITY } from './actions'

export function setCities(cities) {
  return {
    type: SET_CITIES,
    cities
  }
}

export function fetchCities(city) {

  if (city != null) {
    return dispatch => {
      fetch(`/cities/${city}`)
        .then(res => res.json())
        .then(cities => dispatch(setCities(cities)))
    }
  } else {
    return dispatch => {
      fetch('/cities/')
        .then(res => res.json())
        .then(cities => dispatch(setCities(cities)))
    }
  }
}

