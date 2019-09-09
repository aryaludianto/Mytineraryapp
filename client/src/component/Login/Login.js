import React from 'react';
import './Login.css';
import responseGoogle from '../googleLogin/googleLogin'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault();
  }


  render() {
    return (
      <div className="Login">
        <h1 className="createHeadLog">Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="formInp">
            <label>
              <p>Email:</p><input type="text" name="username" value={this.state.username} onChange={this.onChange}></input>
            </label>
          </div>
          <div className="formInpLog">
            <label>
              <p>Password:</p><input type="password" name="password" value={this.state.password} onChange={this.onChange}></input>
            </label>
          </div>


          <div className="userAgree">
            <label>
              <input type="checkbox" value="remember" /> Remember Me
            </label>
          </div>
          <input className="submtLog" type="submit" value="OK" />
        </form>

        {/* {responseGoogle} */}

        <h1 className="textLog">Don't have a MYtinerary account yet? You should create one! It's totally free and only takes a minute.</h1>

        <a href="/CreateAccount"> <p>CreateAccount</p> </a>
      </div>
    );
  }
}

export default Login;