import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { reduxForm } from 'redux-form';
import { Form, Message, Icon } from 'semantic-ui-react'; 

import { loginUser, clearAuthErrors } from '../../actions/auth';

import renderFields from './renderFields';

// Input fields to render
const inputFields = [
  {name: 'username', type: 'text'},
  {name: 'password', type: 'password'}
];

// Form validationg for redux-form
const validate = formProps => {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Please enter an username';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

class Login extends Component {
  componentDidMount() {
    this.props.clearAuthErrors();
  }

  handleFormSubmit = (formProps) => {
    this.props.loginUser(formProps);
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    const containsError = errorMessage.length > 0;

    return (
      <Form error={containsError} onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Message error header='Error:' content={errorMessage}/>
        {renderFields(inputFields)}
        <Form.Button>
          <Icon name='sign in' />Login
        </Form.Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {errorMessage: state.auth.error}
}

const createForm = reduxForm({  
  form: 'login',
  validate
});

export default connect(mapStateToProps, { loginUser, clearAuthErrors })(createForm(Login));  