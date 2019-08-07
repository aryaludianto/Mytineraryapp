import { SET_CITIES, PICK_CITY } from '../actions/actions';


const citiesReducer = (state = [], action = {}) => {
  switch (action.type) {

  case SET_CITIES:
    return action.cities;
  case PICK_CITY:
    return state = [...state, {city: action.city} ] 
  default: return state
  }
}


export default citiesReducer;