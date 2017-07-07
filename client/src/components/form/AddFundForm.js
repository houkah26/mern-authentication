import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { Field, reduxForm } from 'redux-form';
import { Form, Icon } from 'semantic-ui-react'; 

import { addFunds } from 'actions/user';

import RenderField from './RenderField';

// Input fields to render
const inputFields = ["fundAmount"];

// Form validationg for redux-form
const validate = formProps => {
  const errors = {};

  const fundAmount = parseFloat(formProps.fundAmount);

  if (isNaN(fundAmount)) {
    errors.fundAmount = 'Please enter a valid fund amount.';
  }

  if (formProps.fundAmount <= 0) {
    errors.fundAmount = 'Please enter an amount greater than zero.';
  }

  return errors;
}

class AddFunds extends Component {
  handleFormSubmit = (formProps) => {
    this.props.addFunds(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {inputFields.map(name => <Field name={name} component={RenderField} key={name}/>)}
        <Form.Button>
          <Icon name='dollar' />Add Funds
        </Form.Button>
      </Form>
    );
  }
}

const createForm = reduxForm({  
  form: 'addFunds',
  validate
});

export default connect(null, { addFunds })(createForm(AddFunds));  