// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './Header.css'

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
      this.setState({isLoggedIn: true})
    }
  }

  render() {
    return (
      <div className="Header">
        <a href="/login" className="userIcon"><img src='https://img.icons8.com/wired/64/000000/circled-user.png' alt="userIcon" className="userIconA"></img></a>
        <a href="/" className="navIcon"><img src="https://img.icons8.com/ios-glyphs/90/000000/menu.png" alt="navIcon" className="navIconA"></img></a>
      </div>
    );
  }
}

export default Header;
