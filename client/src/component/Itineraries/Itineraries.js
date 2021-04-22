// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItineraries } from '../../store/actions/itineraryActions'
import { fetchCities } from '../../store/actions/citiesActions'
import { getUsers } from '../../store/actions/profileAction'
import { getProfile } from '../../store/actions/profileAction'
import './Itinerary.css';
// eslint-disable-next-line no-unused-vars
import ActivitiesCont from '../Activities/ActivitiesCont';
import { isLoggedIn } from '../../store/actions/loginActions';
// eslint-disable-next-line no-unused-vars
import { NavLink } from 'react-router-dom';
// import LikeButton from '../Like/LikeButton'
import { getFavourites } from '../../store/actions/favouriteActions'
// eslint-disable-next-line no-unused-vars
import ItinerariesDisp from './itinerariesDisp'

class Itineraries extends Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: {} }

    this.drop = this.drop.bind(this)

  }

  componentDidMount() {
    this.props.fetchItineraries(window.location.href.split('/').splice(-1)[0]);
    this.props.fetchCities(window.location.href.split('/').splice(-1)[0]);
    this.props.isLoggedIn()
    this.props.getUsers()
    this.props.getProfile()
    this.props.profile[0] && this.props.getFavourites(this.props.profile[0]._id)
  }

  generateImageURL(fileLocation) {
    if (fileLocation[0] === 'u')
      return `/${fileLocation}`
    else
      return fileLocation
  }

  drop(e) {
    this.setState({
      isOpen: {
        ...this.state.isOpen,
        [e]: !this.state.isOpen[e]
      }
    })
  }


  render() {

    const { itineraries, cities } = this.props;
    itineraries.forEach(iti => iti.isOpen = false)

    const citiesDisp = cities.map((city) => {
      return (
        <div className="citiesDisp" key={city._id}>
          <div className="cardT" style={{
            backgroundImage: `url(${city.img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}></div>
          <div className="cityName">
            <h1 className="cityName">{city.name}</h1>
          </div>
        </div>

      )
    })


    return (
      <div className="itinerariesBody">
        <div className="topCard" >
          <div className="cityDisplay">
            {citiesDisp}
          </div>
          {itineraries.length === 0 ? <p className="noAvail">No available Mytineraries</p> : <p className="avail">Available Mytineraries</p>}
        </div>
        <div className="itineraries">
          <ItinerariesDisp props={itineraries} />
          {this.props.login.isLoggedIn && (<div className="addItinerary">
            <NavLink to='/add'> <button>Add Your Own Itinerary</button>
            </NavLink>
          </div>)}
          <div className="anotherCity">
            <NavLink to="/Cities">
              <p>Choose Another City ⤶ </p>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries,
    cities: state.cities,
    login: state.login,
    profile: state.profile.profile,
    users: state.profile.users
  }
}

export default connect(mapStateToProps, { fetchItineraries, fetchCities, isLoggedIn, getUsers, getProfile, getFavourites })(Itineraries);