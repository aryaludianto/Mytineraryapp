import citiesReducer  from './citiesReducer';
import { combineReducers } from 'redux';
import itinerariesReducer from './itineraryReducers';
import usersReducer from './userReducers';

const rootReducer = combineReducers({ cities:citiesReducer, itineraries:itinerariesReducer, users:usersReducer })

export default rootReducer;