// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';

//new way
import Menu from './Menu';
import { NavLink } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    let user = localStorage.getItem('user')
    if (user) {
      this.setState({ isLoggedIn: true })
      console.log("loggin")
    } else {
      console.log("logged out")
    }
  }
  render() {

    const guestLink = (
      <div className="Header">

        {/* <a href="/login" className="userIcon"><img src='https://img.icons8.com/wired/64/000000/circled-user.png' alt="userIcon" className="userIconA"></img></a> */}
      
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
        {/* <a href="/ProfilePageCont" className="userIcon"><img src='https://img.icons8.com/wired/64/000000/circled-user.png' alt="userIcon" className="userIconA"></img></a> */}

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
        {this.state.isLoggedIn ? userLink : guestLink}
      </div>

      // {/* <div className="headerContainer">
      //   <div className="header">
      //     <div className="profile">
      //       <NavLink to="/profilePage">
      //         {this.state.isLoggedIn ? (
      //           <AccountCircle style={{ fontSize: 36, color: "#484848" }} />
      //         ) : (
      //             <AccountCircle style={{ fontSize: 36, color: "#D8D8D8" }} />
      //           )}
      //       </NavLink>
      //     </div>
      //     <div className="menu">
      //       <Menu />
      //     </div>
      //   </div>
      // </div> */}

    );
  }
}

// Header.propTypes = {
//   auth: React.propTypes.object.isRequired
// }

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users
  }
}

export default connect(mapStateToProps)(Header);
