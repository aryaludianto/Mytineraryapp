import React, { Component } from 'react'
// import Activities from './Activities'
import './Activities.css'
import { Link } from 'react-router-dom'

export default class ActivitiesCont extends Component {


  generateImageURL(fileLocation) {
    if (fileLocation[0] === 'u')
      return `/${fileLocation}`
    else
      return fileLocation
  }

  render() {

    const itinerary = this.props.itinerary;

    const activitiesDetail = itinerary.activities.map(active => {
      return (
        <Link to={`/Activity/${itinerary._id}/${active._id}`} key={active._id}>
          <div className="activitesContainer" key={active._id}>
            <div className="imageContainer" key={active._id} style={{
              backgroundImage: `url(${this.generateImageURL(active.img)})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}>
              <p className="activityName">{active.name}</p>
            </div>
          </div>
        </Link>
      )


    })

    return (
      <div className="activeContainer" key={itinerary._id}>
        <p className="Actv">Activities</p>
        <div className="actvContainer">
          {activitiesDetail}
        </div>
      </div>
    )
  }
}
