/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ActivitiesCont from '../Activities/ActivitiesCont';
import LikeButton from '../Like/LikeButton';
import { connect } from 'react-redux';

export class ItinerariesDisp extends Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: {} }

    this.drop = this.drop.bind(this)

  }

  drop(e) {
    this.setState({
      isOpen: {
        ...this.state.isOpen,
        [e]: !this.state.isOpen[e]
      }
    })
  }


  generateImageURL(fileLocation) {
    if (fileLocation[0] === 'u')
      return `/${fileLocation}`
    else
      return fileLocation
  }

  render() {
    const itinerariesDisp = this.props.props && this.props.props.map((itinerary) => {
      let tag = itinerary.hashtags.map(hashtag => {
        return <p key={hashtag}>#{hashtag}</p>
      })

      return (
        <div className="itinerariesDisp" key={itinerary._id}>
          <div className="itiCard" key={itinerary._id}>
            <div className="profile" >
              <img
                src={this.generateImageURL(itinerary.profilePic)}
                className='profPic'
                alt={itinerary.profileName}
                key={itinerary._id} />
              <p>{itinerary.profileName}</p>
            </div>
            <div className="titContainer" key={itinerary._id}>
              {this.props.login.isLoggedIn && <LikeButton props={itinerary} />}
              <h1 className="itiTitle">{itinerary.title}</h1>
              <div className='ratings'>
                <p>Likes: {itinerary.rating}</p>
                <p>{itinerary.duration} Hours</p>
                <p>{itinerary.price} </p>
              </div>
              <div className="tags">{tag}</div>
            </div>
          </div>
          {this.state.isOpen[itinerary._id] && <ActivitiesCont itinerary={itinerary}></ActivitiesCont>}
          <div className="viewAll" onClick={() => this.drop(itinerary._id)}>
            {!this.state.isOpen[itinerary._id] ? <p>View All</p> : <p>Close</p>}
          </div>
        </div>
      )
    })

    return (
      <div>
        {itinerariesDisp}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps)(ItinerariesDisp);

