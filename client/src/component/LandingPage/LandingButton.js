import React, { Component } from 'react';
import { getProfile } from '../../store/actions/profileAction';
import { isLoggedIn } from '../../store/actions/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



export class LandingButton extends Component {


  componentDidMount() {
    console.log(this.props.profile);
  }

  render() {

   
    return (
      <div>
        { this.props.profile[0] ? (<p> Welcome {this.props.profile[0].firstName}</p>) : (
          <div className="acc">
            <a href="/Login"><p>Log in</p></a>
            <a href="/CreateAccount"><p>Create Account</p></a>
          </div>)
        }
      </div>
    );
  }
}


LandingButton.propTypes = {
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
    profile: state.profile.profile
  }
}

export default connect(
  mapStateToProps,
  { isLoggedIn, getProfile }
)(LandingButton);
