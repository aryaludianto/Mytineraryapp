import React, { Component } from "react";
import Favourite from "./Favourite";
import { getProfile } from "../../store/actions/profileAction";
import { getFavourites } from '../../store/actions/favouriteActions';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoggedIn } from '../../store/actions/loginActions'

class FavouritesContainer extends Component {

  getProfileAndFavourites = (callback) => {
    this.props.isLoggedIn();
    this.props.getProfile();

    console.log(this.props.profile[0])
    callback(this.props.profile[0]);
  };


  componentDidMount() {
    this.getProfileAndFavourites((user) => {
      this.props.getFavourites(user);
    });
  }


  render() {
    return (
      <div className="itinerariesBody">
        <Favourite
          profile={this.props.profile[0]}
          favourites={this.props.favourites}
        />
      </div>
    );
  }
}

FavouritesContainer.propTypes = {
  getProfile: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.func.isRequired,
  profile: PropTypes.array.isRequired
};

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
