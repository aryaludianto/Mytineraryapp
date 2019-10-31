import { SET_ITINERARIES, ADD_ITINERARIES } from '../actions/actions';


const itinerariesReducer = (state = [], action = {}) => {
  switch (action.type) {
  case SET_ITINERARIES:
    return action.itineraries;
  case ADD_ITINERARIES:
    return action.payload;
  default: return state
  }
}


export default itinerariesReducer;