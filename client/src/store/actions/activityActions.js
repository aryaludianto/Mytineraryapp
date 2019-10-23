/* eslint-disable no-console */
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


export const addActivityPict = tempData => dispatch => {

  let { formData, data } = tempData, imgIsLoaded;

  imgIsLoaded = formData.get('file')

  console.log(imgIsLoaded)

  if (imgIsLoaded !== 'null') {
    axios.post('/itineraries/uploads', formData)
      .then(res => {
        data.img = res.data
        dispatch({
          type: ADD_ACTIVITY_PICT,
          payload: data
        })
      })
      .catch(err => {
        console.log(err)
      });
  } else {
    data.img = 'uploads/activities/no_preview.jpg'
    dispatch({
      type: ADD_ACTIVITY_PICT,
      payload: data
    })
  }



}
