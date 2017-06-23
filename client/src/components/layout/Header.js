import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';  

import { logoutUser } from '../../actions';

const Header = ({ logoutUser, authenticated }) => (
  <div>
    <Link to="/">HomePage!</Link>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
    <Link to="/dashboard">Dashboard</Link>
    <button onClick={logoutUser}>Logout</button>
  </div>
)

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, { logoutUser })(Header);