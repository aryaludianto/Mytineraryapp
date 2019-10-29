import { LIKE_ITINERARY } from '../actions/actions';

const initialState = {
  profile: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  case LIKE_ITINERARY
    return {
      ...state,
      profile: action.payload
    };
  default:
    return state;
  }
}
