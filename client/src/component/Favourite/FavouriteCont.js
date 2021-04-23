import React, { Component } from 'react';
import Favourite from './Favourite';
import { getProfile } from '../../store/actions/profileAction';
import { getFavourites } from '../../store/actions/favouriteActions';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../store/actions/loginActions'
import { getProfileFunction } from '../../store/general/profile'

class FavouritesContainer extends Component {

  componentDidMount() {
    this.props.isLoggedIn();
    this.props.getProfile();
    getProfileFunction(this.props.getFavourites)
  }

  render() {
    const FavoritePage = (<div className="itinerariesBody">
      <Favourite
        profile={this.props.profile[0]}
        favourites={this.props.favourites}
      />
    </div>)

    return FavoritePage
  }
}


const mapStateToProps = (state) => {
  return {
    login: state.login,
    profile: state.profile.profile,
    favourites: state.favourites.favourites
  }
};

export default connect(
  mapStateToProps,
  {
    getProfile,
    getFavourites,
    isLoggedIn,
  }
)(FavouritesContainer);
