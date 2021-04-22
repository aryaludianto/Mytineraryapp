/* eslint-disable indent */
import { GET_PROFILE, LOAD_USERS } from '../actions/actions';

const initialState = {
  profile: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case LOAD_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}
