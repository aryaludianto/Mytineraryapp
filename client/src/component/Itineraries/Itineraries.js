// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItineraries } from '../../store/actions/itineraryActions'
import { fetchCities } from '../../store/actions/citiesActions'
import './Itinerary.css';
import Activities from '../Activities/Activities';
import { isLoggedIn } from '../../store/actions/loginActions';


class Itineraries extends Component {



  componentDidMount() {
    this.props.fetchItineraries(window.location.href.split('/').splice(-1)[0]);
    this.props.fetchCities(window.location.href.split('/').splice(-1)[0]);
    this.props.isLoggedIn()
  }


  state = { isOpen: {} }

  render() {
    const { itineraries, cities } = this.props;

    itineraries.forEach(iti => iti.isOpen = false)

    let drop = (e) => {
      this.setState({
        isOpen: {
          ...this.state.isOpen,
          [e]: !this.state.isOpen[e]
        }
      })
    }

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

    const itinerariesDisp = itineraries.map((itinerary) => {

      let tag = itinerary.hashtags.map(hashtag => {
        return <p key={hashtag}>#{hashtag}</p>
      })

      return (
        <div className="itinerariesDisp" key={itinerary._id}>
          <div className="itiCard" key={itinerary._id}>
            <div className="profile" >
              <img src={itinerary.profilePic} className='profPic' alt={itinerary.profileName} key={itinerary._id} />
              <p>{itinerary.profileName}</p>
            </div>
            <div className="titContainer" key={itinerary._id}>
              <h1 className="itiTitle">{itinerary.title}</h1>
              <div className='ratings'>
                <p>Likes: {itinerary.rating}</p>
                <p>{itinerary.duration} Hours</p>
                <p>{itinerary.price}</p>
              </div>
              <div className="tags">{tag}</div>
            </div>
          </div>
          {this.state.isOpen[itinerary._id] && <Activities itinerary={itinerary}></Activities>}
          <div className="viewAll"  onClick={() => drop(itinerary._id)}>
            {!this.state.isOpen[itinerary._id] ? <p>View All</p> : <p>Close</p>}
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
          {itinerariesDisp.length === 0 ? <p className="noAvail">No available Mytineraries</p> : <p className="avail">Available Mytineraries</p>}
        </div>
        <div className="itineraries">
          {itinerariesDisp}
          <div className="anotherCity"> <a href="/Cities">Choose Another City ⤶ </a></div>
        </div>
      </div>
    )
  }
}

// itineraries.propTypes = {
//   itineraries: PropTypes.array.isRequired,
//   fetchitineraries: PropTypes.func.isRequired
// }


const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries,
    cities: state.cities,
    login: state.login,
    profile: state.profile.profile
  }
}


export default connect(mapStateToProps, { fetchItineraries, fetchCities, isLoggedIn })(Itineraries);