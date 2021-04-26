/* eslint-disable no-unused-vars */
import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import google from '../img/google_logo.png';
import PropTypes from 'prop-types';
import {
  checkAccount,
  oauthGoogle
} from '../../store/actions/loginActions'
import { NavLink } from 'react-router-dom';

import { isLoggedIn } from '../../store/actions/loginActions';
import { getProfile } from '../../store/actions/profileAction';
import { Redirect } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      accessToken: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.props.checkAccount(email, password);
    this.props.isLoggedIn();
  }

  async responseGoogle(res) {
    console.log('this is googe response from async function')
    console.log(res.accessToken)

    // await this.props.oauthGoogle(res.accessToken);
    // if (!this.props.errorMessage) {
    //   this.props.isLoggedIn();
    //   // this.props.getProfile();
    // }
  }

  render() {

    const isLoggedinProperly = this.props.login.isLoggedIn;
    if (isLoggedinProperly) {
      return (<Redirect to='/' />)
    }

    return (
      <>
        <div className="Login">
          <h1 className="createHeadLog">Login</h1>
          <form onSubmit={this.onSubmit}>
            <div className="formInp">
              <label>
                <p>Email:</p><input type="text"
                  name="email"
                  value={this.state.value}
                  onChange={this.onChange}>
                </input>
              </label>
            </div>
            <div className="formInpLog">
              <label>
                <p>Password:</p><input type="password"
                  name="password"
                  value={this.state.value}
                  onChange={this.onChange}>
                </input>
              </label>
            </div>
            <input className="submtLog" type="submit" value="OK" />
          </form>

          <div className="googleButton">
            <GoogleLogin
              // clientId="71133190926-d8mjt4mslu36qa3md2efuql8md35sjg9.apps.googleusercontent.com"
              clientId="796492216166-3mnm6nan8ep6strlkerkj6u34m328gir.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  className="btn btn-primary google"
                >
                  <div>
                    <img
                      style={{ maxHeight: '25px', margin: 'auto' }}
                      src={google}
                      alt="google"
                    />
                    Log in with Google
                  </div>
                </button>
              )}
              buttonText="Log in with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
          <h1 className="textLog">Don't have a MYtinerary account yet? You should create one! It's totally free and only takes a minute.</h1>
          <div className="createAcc">
            <NavLink to='CreateAccount'>
              <button
                className="btn btn-primary google "
              >
                <div>
                  Create Account
                </div>
              </button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  checkAccount: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
})

export default connect(
  mapStateToProps,
  { checkAccount, oauthGoogle, isLoggedIn, getProfile }
)(Login);