import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.css'

import { getProfile } from '../../store/actions/profileAction';
import Profile from './Profile';
import { Redirect } from 'react-router-dom';

class ProfilePageCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('email');
    this.setState({ isLoggedIn: false });

    this.props.history.push('/')
    // return (<Redirect to='/' />)
  }

  componentDidMount() {
    if (localStorage.getItem('user') != null || this.props.login.isLoggedIn) {
      this.setState({ isLoggedIn: true });
      this.props.getProfile();
    }
  }

  render() {

    const isLoggedOutProperly = this.state.isLoggedIn;

    // if (!isLoggedOutProperly) {
    //   return (<Redirect to='/' />)
    // }

    return (
      <div>
        <div
          className="container"
          style={{
            marginBottom: '60px',
            zIndex: 2
          }}
        >
          {this.state.isLoggedIn ? (
            <div style={{ marginTop: '70px' }}>
              {this.props.profile.map(profile => (
                <Profile key={profile._id} profile={profile} />
              ))}
              <div
                className=" cardItem btn btn-primary"
                onClick={e => this.handleClick(e)}
              >
                Log Out
              </div>
            </div>
          ) : (
            <div className="noLoginFavourites">
              {' '}
              You're not logged in!
              <span
                role="img"
                aria-label="smiling face with open mouth and cold sweat"
              >
                {' '}
              </span>
              Please log in to see your Profile
              <span role="img" aria-label="thumbs up sign">

              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ProfilePageCont.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(ProfilePageCont);
