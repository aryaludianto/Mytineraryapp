import React from 'react';
import './CreateAccount.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, fetchUsers } from '../../store/actions/signUpActions'
import Add from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';


const emailRegx = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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
      submitReady: false,
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
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

  }






  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
    case 'username':
      formErrors.userName =
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
      formErrors.firstName =
        value.length < 3 ? 'minimum 3 characters required' : '';
      break;
    case 'lastname':
      formErrors.lastName =
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
      // let formData = new FormData();

      // formData.append("username", this.state.username);
      // formData.append("password", this.state.password);
      // formData.append("email", this.state.email);
      // formData.append("firstname", this.state.firstname);
      // formData.append("lastname", this.state.lastname);
      // formData.append("country", this.state.country);

      // console.log(formData)

      let user = {
        'username': this.state.username,
        'password': this.state.password,
        'email': this.state.email,
        'firstname': this.state.firstname,
        'lastname': this.state.lastname,
        'country': this.state.country
      }


      this.props.userSignupRequest(user)

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
        <div className="addPhoto">
          <p>Add Photo</p>
        </div>

        <form
          onChange={this.handleButtonChange}
          onSubmit={this.onSubmit}
        >

          {/* <label className="profileImageUpload" htmlFor="file">
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
              Username:{' '}
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
          </div>


          <div className="formInp">
            <label>
              <p>Password:</p><input type="password" name="password" value={this.state.password} onChange={this.onChange}></input>
            </label>
          </div>
          <div className="formInp">
            <label>
              <p>Email:</p><input type="text" name="email" value={this.state.email} onChange={this.onChange}></input>
            </label>
            {this.props.users[0] && <p>Email already exist!!!</p>}
          </div>
          <div className="formInp">
            <label>
              <p>First Name:</p><input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange}></input>
            </label>
          </div>
          <div className="formInp">
            <label>
              <p>Last Name:</p><input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange}></input>
            </label>
          </div>
          <div className="formInp">
            <label>
              <p>Country:</p>
              <select className="countrySelect" value={this.state.country} onChange={this.onChange}>
                <option value="" disabled>Choose</option>
                <option value="England">England</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Holland">Holland</option>
                <option value="Ireland">Ireland</option>
                <option value="Spain">Spain</option>
                <option value="United States">United States</option>
              </select>
            </label>
          </div>
          <div className="userAgree">
            <label>
              <input type="checkbox" value="agree" /> I agree to Mytinerary's Terms & Conditions
            </label>
          </div>
          {!this.props.users[0] && <input className="submt" type="submit" value="OK" />}
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