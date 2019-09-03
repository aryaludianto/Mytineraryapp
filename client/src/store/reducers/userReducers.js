import { SET_USERS, ADD_USER, DELETE_USER, EDIT_USER, PICK_USER } from '../actions/actions'

const usersReducer = (state = [], action = {}) => {
  switch (action.type) {

  case SET_USERS:
    return action.users;
  case ADD_USER:
    return state = [...state, {user: action} ] 
  default: return state
  }
}


export default usersReducer;

