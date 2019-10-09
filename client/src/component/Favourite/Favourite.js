import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getFavourites } from '../../store/actions/favouriteActions';
import { getProfile } from '../../store/actions/profileAction';
import PropTypes from 'prop-types';

import Itineraries from '../Itineraries/Itineraries';
import { fetchActivities } from '../../store/actions/activityActions';
import { postComment } from '../../store/actions/commentActions';

class Favourite extends Component {
  async fetchEverything() {
    let itinerariesArray = [];

    console.log(this.props.profile[0]);
    var user = this.props.profile[0].email;
    console.log('user', user);

    this.props.favourites.map(itinerary =>
      itinerariesArray.push(itinerary._id)
    );

    this.props.fetchActivities(itinerariesArray);
    this.props.postComment(itinerariesArray);
  }

  componentDidMount() {
    let user = localStorage.getItem('user');
    if (user) {
      this.setState({ isLoggedIn: true });
      this.fetchEverything();
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  render() {
    return (
      <div
        className="container"
        style={{ marginBottom: '70px', marginTop: '70px' }}
      >
        <h1>Favourites</h1>
        <div className="favouriteContent">
          {!this.state.isLoggedIn ? (
            <div className="noLoginFavourites">
              {' '}
              You have to Log in!
              <span
                role="img"
                aria-label="smiling face with open mouth and cold sweat"
              >
                {' '}
              </span>
              Please log in{' '}
              <span role="img" aria-label="red heart">
                To see your Favourite Itineraries
              </span>
            </div>
          ) : this.props.favourites.length !== 0 ? (
            this.props.favourites.map(favourite => (
              <Itineraries
                key={favourite._id}
                useCase="favourite"
                itinerary={favourite}
                favourites={this.props.favourites}
              />
            ))
          ) : (
            <div className="noLoginFavourites">
              {' '}
                  You don't have any favourites!
              <span
                role="img"
                aria-label="smiling face with open mouth and cold sweat"
              >
                {' '}
              </span>
                  Check out all the fun itineraries and find the ones You love!{' '}
              <span role="img" aria-label="left pointing magnifying glass">

              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Favourite.propTypes = {
  getFavourites: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  favourites: state.favourites.favourites,
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  {
    getProfile,
    getFavourites,

    fetchActivities,
    postComment
  }
)(Favourite);
