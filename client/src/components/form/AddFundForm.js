import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Form, Icon, Message } from "semantic-ui-react";

import { countDecimals } from "./helperFunctions";

import { addFunds } from "../../actions/user";

import renderFields from "./renderFields";

// Input fields to render
const inputFields = [{ name: "fundAmount", type: "number" }];

// Form validationg for redux-form
const validate = formProps => {
  const errors = {};

  const fundAmount = parseFloat(formProps.fundAmount);
  if (isNaN(fundAmount) || fundAmount <= 0 || countDecimals(fundAmount) > 2) {
    errors.fundAmount = "Please enter a valid fund amount.";
  }

  return errors;
};

class AddFunds extends Component {
  state = {
    addFundSuccess: false
  };

  componentWillReceiveProps(nextProps) {
    // If cash was increased set addFundSuccess to true
    if (nextProps.cash > this.props.cash) {
      this.setState({ addFundSuccess: true });
    }
  }

  handleFormSubmit = formProps => {
    this.setState({ addFundSuccess: false });
    this.props.addFunds(formProps.fundAmount);
  };

  render() {
    const { addFundSuccess } = this.state;
    const { handleSubmit, addFundErrorMessage } = this.props;
    const addFundContainsError = addFundErrorMessage.length > 0;

    return (
      <Form
        success={addFundSuccess}
        error={addFundContainsError}
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        {renderFields(inputFields)}
        <Form.Button color="green">
          <Icon name="dollar" />Add Funds
        </Form.Button>
        <Message error content={addFundErrorMessage} />
        <Message success content="Successfully added funds." />
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return { cash: state.auth.user.cash, addFundErrorMessage: state.auth.error };
};

const createForm = reduxForm({
  form: "addFunds",
  validate
});

export default connect(mapStateToProps, { addFunds })(createForm(AddFunds));
