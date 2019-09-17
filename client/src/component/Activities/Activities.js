import React, { Component } from 'react'
import './Activities.css'

export default class Activities extends Component {

  itinerary = this.props.itinerary;


  render() {

    const activitiesDetail = this.itinerary.activities.map(active => {
      return (
        <div className="activitesContainer" key={active._id}>
          <div className="imageContainer" key={active._id} style={{
            backgroundImage: `url(${active.img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}>
            <p className="activityName">{active.name}</p>
          </div>
        </div>
      )


    })

    return (
      <div className="activeContainer" key={this.itinerary._id}>
        <p className="Actv">Activities</p>
        <div className="actvContainer">
          {activitiesDetail}
        </div>
      </div>
    )
  }
}
