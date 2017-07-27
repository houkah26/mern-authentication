import React from "react";
import { Grid } from "semantic-ui-react";

import QuoteStockForm from "../../form/QuoteStockForm";
import BuyStockForm from "../../form/BuyStockForm";

const BuyStock = () =>
  <Grid stackable columns={2} divided>
    <Grid.Column>
      <QuoteStockForm />
    </Grid.Column>
    <Grid.Column>
      <BuyStockForm />
    </Grid.Column>
  </Grid>;

export default BuyStock;
