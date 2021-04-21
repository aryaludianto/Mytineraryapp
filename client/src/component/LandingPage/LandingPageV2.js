/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react';
// import MYtineraryLogo from '../img/MYtineraryLogo.png';
// import circledRight2 from '../img/circled-right-2-white.png';

import MYtineraryLogo from '../img/mytinerary_logo.png';
import circledRight2 from '../img/right_button.png';

import './LandingPage.css';
import { isLoggedIn } from '../../store/actions/loginActions';
import { getProfile } from '../../store/actions/profileAction'
import { connect } from 'react-redux';
import LandingButton from './LandingButton'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


class LandingPage extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('user') != null) {
      this.props.getProfile();
    }
    this.props.isLoggedIn()
  }


  render() {
    let isAuthenticated = this.props.login.isLoggedIn
    let profile = this.props.profile

    return (
      <div className="landingPage">
        <img className="LandingImg" src={MYtineraryLogo} alt="homeLogo"></img>
        <p className="textIns">Find your perfect trip, designed by insiders who knows and love their cities.</p>
        <h3>Start Browsing</h3>
        <NavLink to="/Cities">
          <div className='imgContainer'>
            <img className="CircleRight" src={circledRight2} alt="homeLogo"></img>
          </div>
        </NavLink>
        <p className="textIns">Want to build your own MYtinerary?</p>
        <LandingButton key={profile.id} profile={profile} isAuthenticated={isAuthenticated} />
        <p className='notifSize'>Mytinerary only Works on your phone, please adjust your screen size.</p>
      </div>
    )

  }
}


LandingPage.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.array.isRequired
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
)(LandingPage);