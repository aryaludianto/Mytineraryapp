import React, { Component } from 'react';
import './Header.css'
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <a href="/login" className="userIcon"><img src="https://img.icons8.com/wired/64/000000/circled-user.png" alt="userIcon" className="userIconA"></img></a>
        <a href="/" className="navIcon"><img src="https://img.icons8.com/ios-glyphs/90/000000/menu.png" alt="navIcon" className="navIconA"></img></a>
      </div>
    );
  }
}

export default Header;
