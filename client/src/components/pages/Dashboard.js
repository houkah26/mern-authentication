import React, { Component } from 'react';
import { connect } from 'react-redux';  
import { protectedTest } from 'actions/auth';
import AddFundForm from '../form/AddFundForm';
import FormWrapper from '../form/FormWrapper';

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
    const FormWithWrapper = () => FormWrapper(AddFundForm);
    return (
      <div>
        <h2>Dashboard</h2>
        {this.renderContent()}
        <FormWithWrapper />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { content: state.auth.content }
}

export default connect(mapStateToProps, { protectedTest })(Dashboard);