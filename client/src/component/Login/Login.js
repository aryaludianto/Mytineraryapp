import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
// import GoogleLogin from '../googleLogin/googleLogin'

import GoogleLogin from 'react-google-login';
import google from '../img/google_logo.png';
import PropTypes from 'prop-types';
import {
  checkAccount,
  oauthGoogle
} from '../../store/actions/loginActions'
import { NavLink } from "react-router-dom";


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
    console.log(this.state);
    const email = this.state.email;
    const password = this.state.password;
    this.props.checkAccount(email, password);
    this.props.history.push('/');
  }

  async responseGoogle(res) {
    console.log('response google', res);
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/');
    }
  }


  render() {
    return (
      <React.Fragment>
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


            <div className="userAgree">
              <label>
                {/* <input type="checkbox" value="remember" /> Remember Me */}
              </label>
            </div>
            <input className="submtLog" type="submit" value="OK" />
          </form>

          <div className="googleButton">
            <GoogleLogin
              clientId="71133190926-d8mjt4mslu36qa3md2efuql8md35sjg9.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  className="btn btn-primary google "
                >
                  <div>
                    <img
                      style={{ maxHeight: '25px', marginRight: 10 }}
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
                  <img
                    style={{ maxHeight: '25px', marginRight: 10 }}
                  />
                  Create Account
              </div>
              </button>
            </NavLink>
          </div>
          {/* <a href="/CreateAccount"> <p>CreateAccount</p> </a> */}
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  checkAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // loggedInUser: state.loggedInUser.loggedInUser
})


export default connect(
  mapStateToProps,
  { checkAccount, oauthGoogle }
)(Login);