import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import { kebabCase, camelCase, round } from "lodash";

import "./NavMenu.css";

import { changeRoute } from "../../../actions/utility";

import MenuItem from "../MenuItem";

class NavMenu extends Component {
  navToRoute = (e, { name }) => {
    // convert name to dash case (ie. add-funds)
    const route = kebabCase(name);
    this.props.changeRoute(`/dashboard/${route}`);
  };

  renderMenuItems = () => {
    // extract active item from path after /dashboard/ and convert to camelcase
    const activeItem = camelCase(this.props.currentPath.slice(11));

    const cash = round(this.props.cash, 2).toFixed(2);

    const itemsToRender = [
      { name: "portfolio", onClick: this.navToRoute },
      { name: "history", onClick: this.navToRoute },
      { name: "buyStock", onClick: this.navToRoute },
      { name: "sellStock", onClick: this.navToRoute },
      { name: "addFunds", onClick: this.navToRoute },
      { name: "userInfo", onClick: this.navToRoute, position: "right" },
      {
        name: "funds",
        header: true,
        headerContent: `Cash Balance: $${cash}`
      }
    ];

    return itemsToRender.map(item =>
      <MenuItem {...item} active={activeItem === item.name} key={item.name} />
    );
  };

  render() {
    return (
      <Menu tabular attached="top" className="dashboard-nav">
        {this.renderMenuItems()}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPath: state.router.location.pathname,
    cash: state.auth.user.cash
  };
};

export default connect(mapStateToProps, { changeRoute })(NavMenu);
