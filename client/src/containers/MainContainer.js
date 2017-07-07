import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import cookie from 'react-cookie'; 

import { fetchUser } from 'actions/auth'

import Layout from 'components/layout';

class MainContainer extends Component {
  componentDidMount() {
    // Check for existing token and get/auth user if exists
    const token = cookie.load('token');
    if (token) {  
      this.props.fetchUser(token);
    }
  }

  render() {
    return <Layout />
  }
}

export default withRouter(connect(null, { fetchUser })(MainContainer))