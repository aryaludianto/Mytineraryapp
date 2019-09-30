import { GET_PROFILE } from '../actions/actions';

const initialState = {
  profile: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  case GET_PROFILE:
    console.log('reducer');
    return {
      ...state,
      profile: action.payload
    };
  default:
    return state;
  }
}
