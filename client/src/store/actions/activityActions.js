/* eslint-disable no-console */
import { FETCH_ACTIVITIES, ADD_ACTIVITY_PICT, FETCH_ACTIVITY } from '../actions/actions';
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

  const { formData, data } = tempData;
  const imgIsLoaded = formData.get('file')

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

export const fetchActivity = activity => dispatch => {

  const itiId = activity[4], activId = activity[5];

  axios
    .get(`/itineraries/activity/${itiId}`)
    .then(res => {
      console.log(res.data);
      let act = res.data[0].activities.filter(act => act._id === activId)

      let data = {
        profilePic: res.data[0].profilePic,
        profileName: res.data[0].profileName,
        activity: act
      }
      console.log(data)

      dispatch({
        type: FETCH_ACTIVITY,
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
    });
}
