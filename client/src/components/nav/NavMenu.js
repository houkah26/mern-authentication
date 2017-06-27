import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import { logoutUser, changeRoute } from '../../actions';

import './NavMenu.css';

class NavMenu extends Component {
  navToRoute = (e, { name }) => {
    const route = name === 'homepage' ? '/' : '/' + name;
    this.props.changeRoute(route);
  }

  render() {
    const activeItem = this.props.currentPath.slice(1);

    return (
      <Menu className='nav-menu' stackable inverted size='huge'>
        <Menu.Item name='homepage' active={activeItem === ''} onClick={this.navToRoute} />
        <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.navToRoute} />
          <Menu.Item position='right' name='login' active={activeItem === 'login'} onClick={this.navToRoute} />
          <Menu.Item name='register' active={activeItem === 'register'} onClick={this.navToRoute} />
          <Menu.Item name='logout' onClick={this.props.logoutUser} />
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