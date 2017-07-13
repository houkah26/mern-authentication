import React, { Component } from 'react';  
import cookie from 'react-cookie';  
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function(ComposedComponent) {  
  class Authentication extends Component {
    componentWillMount() {
      // reroute to login page if no token
      const token = cookie.load('token');
      if (!token) {
        this.props.dispatch(push("/login"));
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.props.dispatch(push("/login"));
      }
    }

    render() {
      if (!this.props.authenticated) {
        return null;
      }

      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}