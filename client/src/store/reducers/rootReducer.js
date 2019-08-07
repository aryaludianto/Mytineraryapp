import citiesReducer  from './citiesReducer';
import { combineReducers } from 'redux';
import itinerariesReducer from './itineraryReducers';

const rootReducer = combineReducers({ cities:citiesReducer, itineraries:itinerariesReducer })

export default rootReducer;