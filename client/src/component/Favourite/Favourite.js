import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getFavourites } from '../../store/actions/favouriteActions';
import { getProfile } from '../../store/actions/profileAction';
import PropTypes from 'prop-types';

import { fetchActivities } from '../../store/actions/activityActions';
import { postComment } from '../../store/actions/commentActions';


import ItinerariesDisp from '../Itineraries/itinerariesDisp'


class Favourite extends Component {

  getProfileAndFavourites (callback) {
    this.props.getProfile();
    var user = this.props.profile[0];
    callback(user);
  }

  // async fetchEverything() {
  //   let itinerariesArray = [];

  //   console.log(this.props.profile[0]);
  //   var user = this.props.profile[0].email;
  //   console.log('user', user);

  //   this.props.favourites.map(itinerary =>
  //     itinerariesArray.push(itinerary._id)
  //   );

  //   this.props.fetchActivities(itinerariesArray);
  //   this.props.postComment(itinerariesArray);
  // }

  componentDidMount() {

    // this.props.getFavourites(this.props.profile[0]._id)
    // this.props.getProfile()
    this.getProfileAndFavourites(() => {
      var user = this.props.profile[0] && this.props.profile[0]._id;
      console.log("this should be user", user);
      this.props.getFavourites(user);
      console.log(this.props);
    });


  }

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  render() {

    let { isLoggedIn } = this.props.login
    console.log(this.props.profile[0])

    return (
      <div
        className="container"
        style={{ marginBottom: '70px', marginTop: '70px' }}
      >
        <h1>Favourites</h1>
        <div className="favouriteContent">
          { this.props.login.isLoggedIn ? (
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
            
            <ItinerariesDisp props={this.props.favourites}/>
           
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
