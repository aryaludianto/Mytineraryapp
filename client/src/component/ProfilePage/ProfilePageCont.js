import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfile } from '../../store/actions/profileAction';

import Header from '../Header/Header';
import Profile from './Profile';

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
  }

  componentDidMount() {
    if (localStorage.getItem('user') != null) {
      this.setState({ isLoggedIn: true });
      this.props.getProfile();
    }
  }

  render() {
    return (
      <div>
        <Header />
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
              Oops you haven't logged in!
              <span
                role="img"
                aria-label="smiling face with open mouth and cold sweat"
              >
                😅{' '}
              </span>
              Please log in order to see your account
              <span role="img" aria-label="thumbs up sign">
                👍🏻
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
