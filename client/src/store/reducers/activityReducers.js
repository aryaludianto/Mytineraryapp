import { FETCH_ACTIVITIES, ADD_ACTIVITY_PICT } from '../actions/actions';


const activityReducer = (state = [], action = {}) => {
  switch (action.type) {
  case FETCH_ACTIVITIES:
    return action.data;
  case ADD_ACTIVITY_PICT:
    return state = [...state, action.payload ]
  default: 
    return state
  }
}


export default activityReducer;