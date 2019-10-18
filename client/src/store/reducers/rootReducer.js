import citiesReducer from './citiesReducer';
import { combineReducers } from 'redux';
import itinerariesReducer from './itineraryReducers';
import usersReducer from './userReducers';
import loginReducer from './loginReducers';
import profileReducer from './profileReducers'
import favouritesReducer from './favouriteReducer'
import activityReducer  from './activityReducers'

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  users: usersReducer,
  login: loginReducer,
  profile: profileReducer,
  favourites: favouritesReducer,
  activities: activityReducer
})

export default rootReducer;