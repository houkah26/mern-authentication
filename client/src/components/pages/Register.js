import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';  
import { Form, Message } from 'semantic-ui-react';
import { startCase } from 'lodash';
import { registerUser } from '../../actions';
import Checkbox from '../form/Checkbox';

const inputFields = ["firstName", "lastName", "email", "password"];

const renderField = field => {
  const { touched, error } = field.meta;
  const input = field.input;
  const name = input.name;
  const type = name === "password" ? "password" : "text";
  const displayError = touched && error && true;

  return (
    <Form.Field error={displayError}>
      <label>{startCase(name)}</label>
      <input type={type} {...input}/>
      {displayError && 
      <span style={{ "color": "#9F3A38" }} className="error">{error}</span>}
    </Form.Field>  
  );
}

const validate = formProps => {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.checkbox) {
    errors.checkbox = 'You must accept the Terms and Conditions';
  }

  return errors;
}

class Register extends Component {  
  handleFormSubmit = (formProps) => {
    this.props.registerUser(formProps);
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    const registerError = errorMessage.length > 0;

    return (
      <Form error={registerError} onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Message error header='Error:' content={errorMessage}/>
        {inputFields.map(name => <Field name={name} component={renderField} key={name}/>)}
        <Field name="checkbox" component={Checkbox} label="I agree to the Terms and Conditions" />
        <Form.Button>Register</Form.Button>
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
  form: 'register',
  validate
});

export default connect(mapStateToProps, { registerUser })(createForm(Register));