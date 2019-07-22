// eslint-disable-next-line no-unused-vars
import React from 'react';
import MYtineraryLogo from '../img/MYtineraryLogo.png';
import circledright2 from '../img/circled-right-2.png';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landingPage">

      <img className="LandingImg" src={MYtineraryLogo} alt="homeLogo"></img>
      <p className="textIns">Find your perfect trip, designed by insiders who knows and love their cities.</p>

      <h3>Start Browsing</h3>
      <a href="/Cities"><img className="CircleRight" src={circledright2} alt="homeLogo"></img></a>

      <p className="textIns">Want to build your own MYtinerary?</p>

      <div className="acc">
        <a href="/Login"><p>Log in</p></a>
        <a href="/CreateAccount"><p>Create Account</p></a>
      </div>
    </div>
  )
}

export default LandingPage;