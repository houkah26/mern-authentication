import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Dropdown, Header, List, Grid } from "semantic-ui-react";
import { Form, Message } from "semantic-ui-react";

import { sellStock } from "../../actions/user";

import renderFields from "./renderFields";

// Input fields to render
const inputFields = [{ name: "numberOfShares", type: "number" }];

// Form validationg for redux-form
const validate = (formProps, props) => {
  const errors = {};

  const numberOfShares = parseFloat(formProps.numberOfShares);

  if (isNaN(numberOfShares)) {
    errors.numberOfShares = "Please enter a valid number of shares.";
  }

  if (formProps.numberOfShares <= 0) {
    errors.numberOfShares = "Please enter an amount greater than zero.";
  }

  return errors;
};

// Create array of stock selection dropdown options from portfolio
const mapStockOptions = portfolio => {
  return portfolio.map(stock => {
    return {
      key: stock.stockSymbol,
      value: stock.stockSymbol,
      text: stock.stockSymbol
    };
  });
};

class SellStockForm extends Component {
  state = { stockOptions: [], selectedStock: null, sellStockSuccess: false };

  componentDidMount() {
    this.setState({ stockOptions: mapStockOptions(this.props.portfolio) });
  }

  handleStockSelection = (e, { value }) => {
    this.props.portfolio.forEach(stock => {
      if (stock.stockSymbol === value) {
        this.setState({ selectedStock: stock });
      }
    });
  };

  handleFormSubmit = formProps => {
    this.props.sellStock(
      this.state.selectedStock.stockSymbol,
      formProps.numberOfShares
    );
  };

  renderSelectedStockInfo = () => {
    const stock = this.state.selectedStock;

    if (stock) {
      return (
        <List divided>
          <List.Item>
            <List.Header>Stock Symbol</List.Header>
            {stock.stockSymbol}
          </List.Item>
          <List.Item>
            <List.Header>Name</List.Header>
            {stock.stockName}
          </List.Item>
          <List.Item>
            <List.Header>Shares Owned</List.Header>
            {stock.totalShares}
          </List.Item>
          <List.Item>
            <List.Header>Current Price</List.Header>
            {`$${stock.price.toFixed(2)}`}
          </List.Item>
          <List.Item>
            <List.Header>Total Value</List.Header>
            {`$${stock.total.toFixed(2)}`}
          </List.Item>
        </List>
      );
    }
  };

  renderSellForm = () => {
    const stock = this.state.selectedStock;
    const { handleSubmit, sellStockErrorMessage } = this.props;
    const sellStockContainsError = sellStockErrorMessage.length > 0;

    if (stock) {
      return (
        <Form
          error={sellStockContainsError}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          {renderFields(inputFields)}
          <Form.Button>Sell Stock</Form.Button>
          <Message error content={sellStockErrorMessage} />
        </Form>
      );
    }
  };

  render() {
    const { stockOptions } = this.state;

    return (
      <Grid stackable columns={2} divided>
        <Grid.Column>
          <Header size="medium">Stock to sell</Header>
          <Dropdown
            placeholder="Select a Stock"
            search
            selection
            fluid
            options={stockOptions}
            onChange={this.handleStockSelection}
          />
          <br />
          {this.renderSellForm()}
        </Grid.Column>
        <Grid.Column>
          <Header size="medium">Selected Stock Info</Header>
          {this.renderSelectedStockInfo()}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { sellStockErrorMessage: state.auth.error };
};

const createForm = reduxForm({
  form: "sellStock",
  validate
});

export default connect(mapStateToProps, { sellStock })(
  createForm(SellStockForm)
);
