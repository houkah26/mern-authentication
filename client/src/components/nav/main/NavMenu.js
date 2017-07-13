import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { logoutUser } from '../../../actions/auth';
import { changeRoute } from '../../../actions/utility';

import MenuItem from '../MenuItem'

import './NavMenu.css';

class NavMenu extends Component {
  navToRoute = (e, { name }) => {
    const route = name;
    this.props.changeRoute(route);
  }

  renderMenuItems = () => {
    const username = this.props.username;
    const isAuthenticated = this.props.authenticated;
    const activeItem = this.props.currentPath.slice(1);

    const homepageItem = [
      {name: '', icon: {name: 'home', size: 'large'}, onClick: this.navToRoute}
    ];
    const isAuthItems = [
      {name: 'dashboard', icon: {name: 'browser', size: 'large'}, onClick: this.navToRoute},
      {name: username, header: true, position: 'right'},
      {name: 'logout', icon: {name: 'sign out', size: 'large'}, onClick: this.props.logoutUser}
    ];
    const notAuthItems = [
      {name: 'register', icon: {name: 'signup', size: 'large'}, onClick: this.navToRoute, position: 'right'},
      {name: 'login', icon: {name: 'sign in', size: 'large'}, onClick: this.navToRoute}
    ];

    const itemsToRender = homepageItem.concat(
      isAuthenticated ? isAuthItems : notAuthItems
    );

    return (
      itemsToRender.map(item => (
        <MenuItem 
          { ...item }
          active={activeItem === item.name}
          key={item.name + 'key'}
        />
      ))
    )
  }

  render() {
    return (
      <Menu className='nav-menu' stackable inverted size='huge'>
        {this.renderMenuItems()}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    currentPath: state.router.location.pathname,
    username: state.auth.user.username
  }
}

export default connect(mapStateToProps, { logoutUser, changeRoute })(NavMenu);