// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { getProfile } from '../../store/actions/profileAction';
import { isLoggedIn } from '../../store/actions/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class LandingButton extends Component {

  componentDidMount() {
    if (localStorage.getItem('user') != null) {
      this.props.getProfile();
    }

    if (!this.props.profile[0] && this.props.login.isLoggedIn) {
      this.props.getProfile();
    }
  }

  render() {
    const isAuthenticated = this.props.login.isLoggedIn;
    const profileName = this.props.profile[0] && this.props.profile[0].firstName;
    const authenticatedUser = (<p> Welcome {profileName}</p>);
    const guestUser = (
      <div className="acc">
        <a href="/Login"><p>Log in</p></a>
        <a href="/CreateAccount"><p>Create Account</p></a>
      </div>)

    return (
      <>
        { isAuthenticated ? authenticatedUser : guestUser}
      </>
    );
  }
}

LandingButton.propTypes = {
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    profile: state.profile.profile
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn, getProfile }
)(LandingButton);
