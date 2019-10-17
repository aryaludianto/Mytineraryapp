import { FETCH_ACTIVITIES, ADD_ACTIVITY_PICT } from '../actions/actions';
import axios from 'axios';

export const fetchActivities = itinerariesArray => dispatch => {
  axios
    .post('/testActivity/activitiesAll', { itinerariesArray })
    .then(res => {
      console.log(res);
      dispatch({
        type: FETCH_ACTIVITIES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};


export const addActivityPict = activityPict => dispatch => {
  console.log(activityPict)

  axios.post('/itineraries/uploads', activityPict)
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_ACTIVITY_PICT,
        payload: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    });
}
