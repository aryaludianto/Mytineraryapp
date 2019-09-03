import React from 'react';
import './CreateAccount.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, fetchUsers } from '../../store/actions/signUpActions'


class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConf: '',
      email: '',
      firstName: '',
      lastName: '',
      country: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.fetchUsers(this.state.email)
    console.log(this.props.users)
    
    

    // this.props.userSignupRequest(this.state)
  }


  render() {
    return (
      <div className="CreateAccount">
        <h1 className="createHead">Create Account</h1>
        <div className="addPhoto">
          <p>Add Photo</p>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="formInp">
            <label>
              <p>Username:</p><input type="text" name="username" value={this.state.username} onChange={this.onChange}></input>
            </label>
          </div>
          <div className="formInp">
            <label>
              <p>Password:</p><input type="password" name="password" value={this.state.password} onChange={this.onChange}></input>
            </label>
          </div>
          <div className="formInp">
            <label>
              <p>Confirm Password:</p><input type="password" name="confPassword" value={this.state.passwordConf} onChange={this.onChange}></input>
            </label>
          </div>
          <div className="formInp">
            <label>
              <p>Email:</p><input type="text" name="email" value={this.state.email} onChange={this.onChange}></input>
            </label>
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
          <input className="submt" type="submit" value="OK" />
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
    users: state.users
  }
}

export default connect(mapStateToProps, {fetchUsers, userSignupRequest}) (CreateAccount);