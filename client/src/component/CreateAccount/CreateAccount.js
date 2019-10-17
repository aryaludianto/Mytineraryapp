/* eslint-disable no-console */
import React from 'react';
import './CreateAccount.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, fetchUsers } from '../../store/actions/signUpActions'
// import Add from '@material-ui/icons/Add';
import Country from './Country'
// import AccountCircle from '@material-ui/icons/AccountCircle';


const emailRegx = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const countries = Country;

const formIsValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};




class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      submitReady: false,
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      country: 'Choose Country',
      formErrors: {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        country: '',
        formError: ''
      }
    }


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleFile = this.handleFile.bind(this);

  }


  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'username':
        formErrors.username =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'password':
        formErrors.password =
          value.length < 6 ? 'minimum 3 characters required' : '';
        break;
      case 'email':
        formErrors.email = emailRegx.test(value)
          ? ''
          : 'invalid email address';
        break;
      case 'firstname':
        formErrors.firstname =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'lastname':
        formErrors.lastname =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'country':
        formErrors.country = value.length < 0 ? 'please choose a country' : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    // this.setState({ [e.target.name]: e.target.value })
    // this.state.email && this.props.fetchUsers(this.state.email)
  }


  handleFile(event) {
    console.log('this is event', event);
    console.log('selectedfile', event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();

    if (formIsValid(this.state)) {
      console.log(`Submitting
      Username: ${this.state.username}
      Password: ${this.state.password}
      Email: ${this.state.email}
      First Name: ${this.state.firstname}
      Last Name: ${this.state.lastname}
      Country: ${this.state.country}`);
    } else {
      console.error('invalid form');
    }


    if (formIsValid(this.state)) {
      let formData = new FormData();

      formData.append('file', this.state.selectedFile);
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      formData.append('email', this.state.email);
      formData.append('firstName', this.state.firstname);
      formData.append('lastName', this.state.lastname);
      formData.append('country', this.state.country);


      this.props.userSignupRequest(formData)

    }
    this.props.history.push('/')
  }

  handleButtonChange(e) {
    console.log('change buttons');
    e.preventDefault();
    if (formIsValid(this.state)) {
      this.setState({ submitReady: true });
    } else {
      console.log('form is not valid');
    }
  }


  render() {
    const { formErrors } = this.state;

    return (
      <div className="CreateAccount">
        <h1 className="createHead">Create Account</h1>

        <form
          onChange={this.handleButtonChange}
          onSubmit={this.onSubmit}
        >


          <div className="addPhoto">
            <p>Add Photo : </p>
            <input
              id="file"
              name="file"
              type="file"
              onChange={this.handleFile}
              style={{ color: '#484848' }}
            />
          </div>
          {/* 
          <label className="profileImageUpload" htmlFor="file">
            <div className="box">
              <div style={{ fontSize: 14 }}>
                Add Photo <Add />
              </div>
            </div>
          </label> */}



          {/*redesign starts here */}
          <div className="userName form-Group input" >
            <label className="form-label"
              style={{ flex: 1 }}
              htmlFor="username"
            >
              Username :{' '}
            </label>
            <input
              type="text"
              name="username"
              onChange={this.onChange}
              className={
                formErrors.username.length > 0
                  ? 'error form-control'
                  : 'form-control'
              }
              style={{ flex: 2 }} />

            {/* {formErrors.username.length > 0 && (
              <span>{formErrors.username}</span>
            )} */}
          </div>
          {formErrors.username.length > 0 && (
            <div className="errorForm">
              <span>{formErrors.username}</span>
            </div>
          )}




          <div className="password input form-Group">
            <label className="form-label"
              style={{ flex: 1 }}
              htmlFor="password"
            >
              Password:{' '}
            </label>
            <input type="password" name="password" onChange={this.onChange}
              className={
                formErrors.password.length > 0 ? 'error form-control'
                  : 'form-control psswd'
              }
            />
          </div>
          {formErrors.password.length > 0 && (
            <div className="errorForm">
              <span>
                {formErrors.password}
              </span>
            </div>
          )}


          <div className="email input form-Group">
            <label className="form-label" style={{ flex: 1 }}
              htmlFor="email">
              Email:{' '}
            </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              className={
                formErrors.email.length > 0
                  ? 'error form-control'
                  : 'form-control eml'
              }
            />
            {/* {formErrors.email.length > 0 && <span>{formErrors.email}</span>} */}
            {/* {this.props.users[0] && <p>Email already exist!!!</p>} */}
          </div>
          {formErrors.email.length > 0 && (
            <div className="errorForm">
              <span>
                {formErrors.email}
              </span>
            </div>
          )}


          <div className="firstName input form-group">
            <label
              className="form-label"
              style={{ flex: 1 }}
              htmlFor="firstname"
            >
              First Name:{' '}
            </label>
            <input type="text"
              name="firstname"
              onChange={this.onChange}
              className={
                formErrors.firstname.length > 0
                  ? 'error form-control'
                  : 'form-control'
              }
              style={{ flex: 2 }}
            />
            {/* {formErrors.firstname.length > 0
              && (<span>{formErrors.firstname} </span>)} */}
          </div>
          {formErrors.firstname.length > 0 && (
            <div className="errorForm">
              <span>
                {formErrors.firstname}
              </span>
            </div>
          )}


          <div className="lastName input form-group">
            <label
              className="form-label"
              style={{ flex: 1 }}
              htmlFor="lastname"
            >
              Last Name:{' '}
            </label>
            <input type="text"
              name="lastname"
              onChange={this.onChange}
              className={
                formErrors.lastname.length > 0
                  ? 'form-control'
                  : 'form-control'
              }
              style={{ flex: 2 }}
            />
            {/* {formErrors.lastname.length > 0 && (<span>{formErrors.lastname}</span>)
            } */}
          </div>
          {formErrors.lastname.length > 0 && (
            <div className="errorForm">
              <span>
                {formErrors.lastname}
              </span>
            </div>
          )}


          <div className="country form-group input">
            <label
              className="form-label"
              style={{ flex: 1 }}
              htmlFor="country"
            >
              Country:{' '}
            </label>
            <select
              className="custom-select"
              name="country"
              onChange={this.onChange}
              required
              style={{ flex: 2 }}
              value={this.state.country}
            >
              <option value='Choose your country'>
                {this.state.country}
              </option>

              {countries.map(country => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}

            </select>
            {/* {formErrors.country.length > 0 && (
              <span>{formErrors.country}</span>
            )} */}
          </div>
          {formErrors.country.length > 0 && (
            <div className="errorForm">
              <span>
                {formErrors.country}
              </span>
            </div>
          )}



          {/* <div> */}
          <label className="form-check-label chk">
            <input className="form-check-input" required type="checkbox" />
            I agree to MYtinerary's Terms &amp; Conditions
          </label>
          {/* </div> */}



          <div style={{ marginBottom: '80px', marginTop: '20px' }}>
            {' '}
            {this.state.submitReady ? (
              <button
                style={{
                  width: '70%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontWeight: 'bold'
                }}
                className="btn btn-primary chkd"
              >
                OK
              </button>
            ) : (
                <button
                  style={{
                    width: '70%',
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontWeight: 'bold'
                  }}
                  className="btn btn-outline-primary chkd"
                >
                  OK
              </button>
              )}
          </div>

        </form>
      </div>
    );
  }
}

CreateAccount.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {
    users: state.users,
    messages: state.users.messages
  }
}

export default connect(
  mapStateToProps,
  { fetchUsers, userSignupRequest }
)(CreateAccount);