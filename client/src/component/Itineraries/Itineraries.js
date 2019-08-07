// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItineraries } from '../../store/actions/itineraryActions'
import { fetchCities } from '../../store/actions/citiesActions'
import './Itinerary.css';

class Itineraries extends Component {

  componentDidMount() {
    this.props.fetchItineraries(window.location.href.split('/').splice(-1)[0]);
    this.props.fetchCities(window.location.href.split('/').splice(-1)[0]);
  }



  state = {isOpen:false}





  render() {
    const { itineraries, cities } = this.props;

    itineraries.forEach(iti => iti.isOpen = false)

    let drop = (e) => {
      itineraries.filter(iti => {
        if (iti._id === e) iti.isOpen = !iti.isOpen
      })
      console.log(itineraries)
    }

    const citiesDisp = cities.map((city) => {
      return (
        <div className="citiesDisp" key={city._id}>
          <div className="card" style={{
            backgroundImage: `url(${city.img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}>
            <h1>{city.name}</h1>
          </div>
        </div>
      )
    })

    const itinerariesDisp = itineraries.map((itinerary) => {

      let tag = itinerary.hashtag.map(hashtag => {
        return <p>#{hashtag}</p>
      })

      return (
        <div className="itinerariesDisp" key={itinerary._id}>
          <div className="itiCard" key={itinerary._id}>
            <div className="profile">
              <img src={itinerary.profilePic} className='profPic' alt={itinerary.profileName} />
              <p>{itinerary.profileName}</p>
            </div>
            <div className="titContainer">
              <h1 className="itiTitle">{itinerary.title}</h1>
              <div className='ratings'>
                <p>Likes: {itinerary.rating}</p>
                <p>{itinerary.duration} Hours</p>
                <p>$$</p>
              </div>
              <div className="tags">{tag}</div>
            </div>
          </div>
          {itinerary.isOpen && <div>Tokaay</div>}
          <div className="viewAll" onClick={() => drop(itinerary._id)}>
            {!itinerary.isOpen ? <p>View All</p> : <p>Close</p>}
          </div>
        </div>
      )
    })

    return (
      <div className="itinerariesBody">
        <div className="topCard">
          <div>
            {citiesDisp}
          </div>
          <p>Available Mytineraries</p>
        </div>
        <div className="itineraries">
          {itinerariesDisp}
        </div>
        <div className="anotherCity"> <a href="/Cities">Choose Another City </a></div>
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
    cities: state.cities
  }
}


export default connect(mapStateToProps, { fetchItineraries, fetchCities })(Itineraries);