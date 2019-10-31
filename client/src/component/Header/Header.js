// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';

//new way
import Menu from './Menu';
import { NavLink } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';


class Header extends Component {

  render() {


    let isAuthenticated  = this.props.login.isLoggedIn

    console.log(this.props.login.isLoggedIn)

    isAuthenticated ? console.log("logged in " + isAuthenticated) : console.log("Logged out " + isAuthenticated)

    const guestLink = (
      <div className="Header">
        <NavLink to="/login" className="userIcon">
          <AccountCircle style={{ fontSize: 36, color: "#484848" }} />
        </NavLink>
        <div className="navIcon" >
          <Menu />
        </div>
      </div>

    )

    const userLink = (
      <div className="Header">
        <NavLink to="/ProfilePageCont" className="userIcon">
          <AccountCircle style={{ fontSize: 36, color: "#D8D8D8" }} />
        </NavLink>
        <div className="navIcon" >
          <Menu />
        </div>
      </div>
    )



    return (
      <div className="Head">
        { isAuthenticated ? userLink : guestLink}
      </div>
    );
  }
}

// Header.propTypes = {
//   auth: React.propTypes.object.isRequired
// }

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users,
    login: state.login
  }
}

export default connect(mapStateToProps)(Header);
