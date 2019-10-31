import React, { Component } from 'react';
import { logout } from '../../store/actions/loginActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class LogOut extends Component {
  constructor(props) {
    super(props);
    this.onClick.bind(this)
  }


  onClick() {
    // this.props.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <button onClick={this.props.logout()}></button>
      </div>
    )
  }
}

LogOut.propTypes = {
  logout: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users
  }
}

export default connect(mapStateToProps, { logout })(LogOut);
