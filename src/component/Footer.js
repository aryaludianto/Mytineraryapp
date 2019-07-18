import React, { Component } from 'react';
import homeIcon from '../img/homeIcon.png';
import './Footer.css'

class Footer extends Component {
  state = {
    isActive: true 
  }

  render() {
    return (
      <div className="Footer">
        <div className="imgWrapper">
        { this.state.isActive ? <img className="homeIcon" src={homeIcon} alt="homeIcon"></img> :
        <img className="homeIconNotActive" src={homeIcon} alt="homeIcon"></img>
        }
        </div>
      </div>
    );
  }
}

export default Footer;
