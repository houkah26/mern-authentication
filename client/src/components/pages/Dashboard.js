import React, { Component } from 'react';
import { connect } from 'react-redux';  
import { protectedTest } from '../../actions/auth';

class Dashboard extends Component {
  componentDidMount() {
    this.props.protectedTest();
  }

  renderContent() {
    if(this.props.content) {
      return (
        <p>{this.props.content}</p>
      )
    }
  }
  
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { content: state.auth.content }
}

export default connect(mapStateToProps, { protectedTest })(Dashboard);