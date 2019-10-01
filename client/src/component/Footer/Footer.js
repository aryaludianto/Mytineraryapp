import React, { Component } from 'react';
import homeIcon from '../img/homeIcon.png';
import './Footer.css';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";


class Footer extends Component {
  state = {
    // isActive: true
  }

  render() {

    let isAuthenticated = this.props.login.isLoggedIn

    return (
      <div className="Footer">
        <div className="imgWrapper">
          {isAuthenticated ?
            <NavLink to="/">
            <img className="homeIcon" src={homeIcon} alt="homeIcon"></img>
            </NavLink>
            :
            <img className="homeIconNotActive" src={homeIcon} alt="homeIcon"></img>
          }
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Footer);
