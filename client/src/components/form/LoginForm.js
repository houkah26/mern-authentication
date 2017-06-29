import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';
import { Form, Message, Icon } from 'semantic-ui-react'; 

import { loginUser, clearAuthErrors } from '../../actions/auth';

import RenderField from './RenderField';

// Input fields to render
const inputFields = ["email", "password"];

// Form validationg for redux-form
const validate = formProps => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
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
        {inputFields.map(name => <Field name={name} component={RenderField} key={name}/>)}
        <Form.Button>
          <Icon name='sign in' />Login
        </Form.Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {  
  return {
    errorMessage: state.auth.error,
  };
}

const createForm = reduxForm({  
  form: 'login',
  validate
});

export default connect(mapStateToProps, { loginUser, clearAuthErrors })(createForm(Login));  