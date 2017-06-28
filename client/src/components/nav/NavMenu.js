import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { logoutUser, changeRoute } from '../../actions';

import MenuItem from './MenuItem'

import './NavMenu.css';

class NavMenu extends Component {
  navToRoute = (e, { name }) => {
    const route = name === 'homepage' ? '/' : '/' + name;
    this.props.changeRoute(route);
  }

  render() {
    const activeItem = this.props.currentPath.slice(1);
    const menuItems = [
      {name: 'homepage', icon: {name: 'home', size: 'large'}, shouldRender: true, position: null, onClick: this.navToRoute},
      {name: 'dashboard', icon: {name: 'browser', size: 'large'}, shouldRender: this.props.authenticated, position: null, onClick: this.navToRoute},
      {name: 'logout', icon: {name: 'sign out', size: 'large'}, shouldRender: this.props.authenticated, position: 'right', onClick: this.props.logoutUser},
      {name: 'register', icon: {name: 'signup', size: 'large'}, shouldRender: !this.props.authenticated, position: 'right', onClick: this.navToRoute},
      {name: 'login', icon: {name: 'sign in', size: 'large'}, shouldRender: !this.props.authenticated, position: null, onClick: this.navToRoute}
    ];

    return (
      <Menu className='nav-menu' stackable inverted size='huge'>
        {menuItems.map(item => (
          <MenuItem 
            { ...item }
            activeItem={activeItem}
            key={item.name}
          />
        ))}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    currentPath: state.router.location.pathname
  }
}

export default connect(mapStateToProps, { logoutUser, changeRoute })(NavMenu);