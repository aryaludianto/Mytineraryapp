import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivities } from '../../store/actions/activityActions';
import { postComment } from '../../store/actions/commentActions';
import ItinerariesDisp from '../Itineraries/itinerariesDisp'


class Favourite extends Component {

  render() {
    let { isLoggedIn } = this.props.login

    const NotLoggedIn = (<div style={{ margin: 'auto 10px' }}>
      {' '}
      You have to Log in!
      <span
        role="img"
      >
        {' '}
      </span>
      Please log in{' '}
      <span role="img" aria-label="red heart">
        To see your Favourite Itineraries
      </span>
    </div>)

    const LoggedInWithFavorites = (<ItinerariesDisp props={this.props.favourites} />)

    const LoggedInWithoutfavorite = (<div className="noLoginFavourites">
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
    </div>)


    return (
      <div className="itineraries">
        <h1 style={{ 'marginTop': '5%' }}>Favourites</h1>
        <div className="itineraries">
          {!isLoggedIn ? (
            NotLoggedIn
          ) : this.props.favourites.length !== 0 ? (
            LoggedInWithFavorites
          ) : (
            LoggedInWithoutfavorite
          )}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  favourites: state.favourites.favourites,
  profile: state.profile.profile,
  login: state.login
});

export default connect(
  mapStateToProps,
  {
    fetchActivities,
    postComment
  }
)(Favourite);
