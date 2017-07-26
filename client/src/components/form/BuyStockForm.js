import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form, Message, Header, Button } from "semantic-ui-react";
import axios from "axios";
import cookie from "react-cookie";
import { round } from "lodash";

import { buyStock } from "../../actions/user";

import { API_URL } from "../../constants";

import renderFields from "./renderFields";

// Input fields to render
const inputFields = [
  { name: "stockSymbol", type: "text" },
  { name: "numberOfShares", type: "number" }
];

// Initial state
const inititalState = {
  quoteSymbol: "",
  quotePrice: 0,
  numShares: 0,
  totalCost: 0,
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

  if (!formProps.numberOfShares || formProps.numberOfShares <= 0) {
    errors.numberOfShares = "Please enter a valid number";
  }

  return errors;
};

class BuyStockForm extends Component {
  state = inititalState;

  handleFormSubmit = formProps => {
    this.setState({ ...inititalState, isLoading: true });
    this.fetchQuote(formProps.stockSymbol, formProps.numberOfShares);
  };

  fetchQuote = (stockSymbol, numberOfShares) => {
    const headers = { headers: { Authorization: cookie.load("token") } };

    axios
      .post(`${API_URL}/user/stock/quote`, { stockSymbol }, headers)
      .then(response => {
        const { data } = response;

        this.setState({
          ...inititalState,
          quoteSymbol: data.stockSymbol,
          quotePrice: round(data.price, 2).toFixed(2),
          numShares: numberOfShares,
          totalCost: round(data.price * numberOfShares, 2),
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

  handlePurchaseClick = () => {
    this.props.buyStock(this.state.quoteSymbol, this.state.numShares);
  };

  render() {
    const {
      quoteSymbol,
      numShares,
      totalCost,
      errorMessage,
      isLoading,
      isSuccesfull
    } = this.state;
    const { handleSubmit } = this.props;
    const containsError = errorMessage.length > 0;

    return (
      <div>
        <Header size="medium">Buy Stock:</Header>
        <Form
          error={containsError}
          success={isSuccesfull}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <Form.Group widths="equal">
            {renderFields(inputFields)}
          </Form.Group>
          <Form.Button loading={isLoading}>
            Calculate Transaction Cost
          </Form.Button>
          <Message error content={errorMessage} />
          <Message success>
            {`${numShares} shares of ${quoteSymbol} costs $${totalCost}.`}
          </Message>
        </Form>
        <br />
        {isSuccesfull &&
          <Button color="green" onClick={this.handlePurchaseClick}>
            Purchase Shares
          </Button>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cash: state.auth.user.cash };
};

const createForm = reduxForm({
  form: "buyStockForm",
  validate
});

export default connect(mapStateToProps, { buyStock })(createForm(BuyStockForm));
