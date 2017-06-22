import React, { Component } from 'react';  
import { connect } from 'react-redux';

export default function(ComposedComponent) {  
  class Authentication extends Component {
    // static contextTypes = {
    //   router: React.PropTypes.object
    // }

    componentWillMount() {
      if(!this.props.authenticated) {
        console.log("component will mount this.props.autheticated = " + this.props.authenticated);
        this.props.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        console.log("component will update nextprops.autheticated = " + this.props.authenticated);
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}