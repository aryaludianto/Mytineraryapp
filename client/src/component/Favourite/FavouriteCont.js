import React, { Component } from "react";
import Favourite from "./Favourite";
import { getProfile } from "../../store/actions/profileAction";
import { getFavourites } from '../../store/actions/favouriteActions';
import { connect } from "react-redux";
import { isLoggedIn } from '../../store/actions/loginActions'

class FavouritesContainer extends Component {

  getProfileAndFavourites = (callback) => {
    this.props.isLoggedIn();
    if (this.props.isLoggedIn) {
      this.props.getProfile();
    }
    callback(this.props.profile[0]);
  };

  componentDidMount() {
    this.getProfileAndFavourites((user) => {
      if (this.props.isLoggedIn) {
        this.props.getFavourites(user);
      }
    });
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
