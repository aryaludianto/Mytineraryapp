import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getFavourites } from '../../store/actions/favouriteActions';
import { getProfile } from '../../store/actions/profileAction';
import PropTypes from 'prop-types';

import { fetchActivities } from '../../store/actions/activityActions';
import { postComment } from '../../store/actions/commentActions';


import ItinerariesDisp from '../Itineraries/itinerariesDisp'


class Favourite extends Component {

  componentDidMount() {

  }

  // constructor(props) {
  //   super(props);

  // }
  render() {

    let { isLoggedIn } = this.props.login

    console.log('isLoggedIn is :', isLoggedIn)

    return (
      <div className="itineraries">
        <h1 style={{ 'margin-top': '5%' }}>Favourites</h1>


        <div className="itineraries">
          {!isLoggedIn ? (
            <div >
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
            <ItinerariesDisp props={this.props.favourites} />
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
  profile: state.profile.profile,
  login: state.login
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
