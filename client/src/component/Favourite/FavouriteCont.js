import React, { Component } from 'react';
import Favourite from './Favourite';
import { getProfile } from '../../store/actions/profileAction';
import { getFavourites } from '../../store/actions/favouriteActions';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../store/actions/loginActions'
import axios from 'axios';

class FavouritesContainer extends Component {

  getProfileAndFavourites = (callbackFunction) => {
    const emailOfUser = localStorage.getItem('email');
    const config = {
      withCredentials: true,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('user') }
    };
    axios
      .post('/profile/profiles', { emailOfUser: emailOfUser }, config)
      .then(res => {
        callbackFunction(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.props.isLoggedIn();
    this.props.getProfile();
    this.getProfileAndFavourites(this.props.getFavourites)
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
