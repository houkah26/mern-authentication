import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import { reduxForm } from 'redux-form';
import { Form, Icon } from 'semantic-ui-react'; 

import { addFunds } from '../../actions/user';

import renderFields from './renderFields';

// Input fields to render
const inputFields = [{name: 'fundAmount', type: 'number'}];

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
        {renderFields(inputFields)}
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