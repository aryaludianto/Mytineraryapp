/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';
import Menu from './Menu';
import { NavLink } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';


class Header extends Component {

  render() {

    const isAuthenticated = this.props.login.isLoggedIn;
    const guestLink = (
      <div className="Header">
        <NavLink to="/login" className="userIcon">
          <AccountCircle style={{ fontSize: 36, color: '#484848' }} />
        </NavLink>
        <div className="navIcon" >
          <Menu />
        </div>
      </div>
    );

    const userLink = (
      <div className="Header">
        <NavLink to="/ProfilePageCont" className="userIcon">
          <AccountCircle style={{ fontSize: 36, color: '#D8D8D8' }} />
        </NavLink>
        <div className="navIcon" >
          <Menu />
        </div>
      </div>
    );

    return (
      <>
        { isAuthenticated ? userLink : guestLink}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users,
    login: state.login
  }
}

export default connect(mapStateToProps)(Header);
