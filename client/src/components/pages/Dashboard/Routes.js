import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NotFoundPage from "../NotFoundPage";
import Portfolio from "./Portfolio";
import BuyStock from "./BuyStock";
import History from "./History";
import AddFunds from "./AddFunds";
import SellStock from "./SellStock";

const Routes = () =>
  <Switch>
    <Route
      exact
      path="/dashboard"
      render={() => <Redirect to="/dashboard/portfolio" />}
    />
    <Route path={"/dashboard/portfolio"} component={Portfolio} />
    <Route path={"/dashboard/buy-stock"} component={BuyStock} />
    <Route path={"/dashboard/history"} component={History} />
    <Route path={"/dashboard/add-funds"} component={AddFunds} />
    <Route path={"/dashboard/sell-stock"} component={SellStock} />
    <Route component={NotFoundPage} />
  </Switch>;

export default Routes;
