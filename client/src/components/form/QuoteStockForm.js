import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Form, Message, Header } from "semantic-ui-react";
import axios from "axios";
import cookie from "react-cookie";
import { round } from "lodash";

import { API_URL } from "../../constants";

import renderFields from "./renderFields";

// Input fields to render
const inputFields = [{ name: "stockSymbol", type: "text" }];

// Initial state
const inititalState = {
  quoteSymbol: "",
  quotePrice: 0,
  quoteName: "",
  errorMessage: "",
  isLoading: false,
  isSuccesfull: false
};

// Form validation for redux-form
const validate = (formProps, props) => {
  const errors = {};

  if (!formProps.stockSymbol) {
    errors.stockSymbol = "Please enter a symbol";
  }

  return errors;
};

class QuoteStockForm extends Component {
  state = inititalState;

  handleFormSubmit = formProps => {
    this.setState({ ...inititalState, isLoading: true });
    this.fetchQuote(formProps.stockSymbol);
  };

  fetchQuote = stockSymbol => {
    const headers = { headers: { Authorization: cookie.load("token") } };

    axios
      .post(`${API_URL}/user/stock/quote`, { stockSymbol }, headers)
      .then(response => {
        const { data } = response;

        this.setState({
          ...inititalState,
          quoteSymbol: data.stockSymbol,
          quotePrice: round(data.price, 2).toFixed(2),
          quoteName: data.stockName,
          isSuccesfull: true
        });
      })
      .catch(error => {
        this.setState({
          ...inititalState,
          errorMessage: error.response.data.message
        });
      });
  };

  render() {
    const {
      quoteSymbol,
      quoteName,
      quotePrice,
      errorMessage,
      isLoading,
      isSuccesfull
    } = this.state;
    const { handleSubmit } = this.props;
    const containsError = errorMessage.length > 0;

    return (
      <div>
        <Header size="medium">Get current stock price:</Header>
        <Form
          error={containsError}
          success={isSuccesfull}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          {renderFields(inputFields)}
          <Form.Button loading={isLoading}>Get Quote</Form.Button>
          <Message error content={errorMessage} />
          <Message success>
            {`The current price of ${quoteName} (${quoteSymbol}) is $${quotePrice}.`}
          </Message>
        </Form>
      </div>
    );
  }
}

const createForm = reduxForm({
  form: "quoteStockForm",
  validate
});

export default createForm(QuoteStockForm);
