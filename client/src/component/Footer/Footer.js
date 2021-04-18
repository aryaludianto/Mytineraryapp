import React, { Component } from 'react';
import homeIcon from '../img/homeIcon.png';
import './Footer.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import IconButton from '@material-ui/core/IconButton';



class Footer extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    let isAuthenticated = this.props.login.isLoggedIn
    const history = createBrowserHistory();

    let homeButtonActive = (
      <div className='footerBar'>
        <div className='homeIcon'>
          <NavLink to='/'>
            <img className="homeI" src={homeIcon} alt="homeIcon"></img>
          </NavLink>
        </div>
      </div>
    )

    let homeButtonNonActive = (<div className='footerBar'>
      {history.location.pathname !== '/' &&
        (<IconButton
          id='leftArr'
          className='leftArrow'
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowLeft className='arrowLeftIcon' style={{ color: '#484848' }} />
        </IconButton>)}

      <img className="homeIconNotActive" src={homeIcon} alt="homeIcon"></img>
    </div>
    )

    return (
      <div className="Footer">
        <div className="imgWrapper">

          {isAuthenticated ?

            history.location.pathname === '/' ?

              homeButtonActive

              :

              (<div className='footerBar'>
                <IconButton
                  id='leftArr'
                  className='leftArrow'
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <ArrowLeft style={{ fontSize: 100, color: '#484848', height: '35px', display: 'grid' }} />
                </IconButton>
                <NavLink to="/" className='homeIcon'>
                  <img className="homeI" src={homeIcon} alt="homeIcon"></img>
                </NavLink>
              </div>)

            : homeButtonNonActive


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
