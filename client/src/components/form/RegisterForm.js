import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';  
import { Form, Message, Icon } from 'semantic-ui-react';

import { registerUser, clearAuthErrors } from 'actions/auth';

import RenderField from './RenderField';
import Checkbox from './Checkbox';

// Input fields to render
const inputFields = ["firstName", "lastName", "username", "password"];

// Form validationg for redux-form
const validate = formProps => {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.username) {
    errors.username = 'Please enter an username';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.checkbox) {
    errors.checkbox = 'You must accept the Terms and Conditions';
  }

  return errors;
}

class RegisterForm extends Component {
  componentDidMount() {
    this.props.clearAuthErrors();
  }

  handleFormSubmit = (formProps) => {
    this.props.registerUser(formProps);
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    const containsError = errorMessage.length > 0;

    return (
      <Form error={containsError} onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Message error header='Error:' content={errorMessage}/>
        <Form.Group widths="equal">
          {inputFields.slice(0, 2).map(name => (
            <Field name={name} component={RenderField} key={name}/>
          ))}
        </Form.Group>
        {inputFields.slice(2).map(name => (
          <Field name={name} component={RenderField} key={name}/>
        ))}
        <Field name="checkbox" component={Checkbox} label="I agree to the Terms and Conditions" />
        <Form.Button>
          <Icon name='signup' />Register
        </Form.Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {errorMessage: state.auth.error}
}

const createForm = reduxForm({  
  form: 'register',
  validate
});

export default connect(mapStateToProps, { registerUser, clearAuthErrors })(createForm(RegisterForm));