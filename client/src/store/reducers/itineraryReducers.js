import { SET_ITINERARIES }  from '../actions/actions';


const itinerariesReducer = (state = [], action = {}) => {
  switch (action.type) {
  case SET_ITINERARIES:
    return action.itineraries;
  default: return state
  }
}


export default itinerariesReducer;