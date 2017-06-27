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
    const authenticated = this.props.authenticated;

    return (
      <Menu className='nav-menu' stackable inverted size='huge'>
        <Menu.Item name='homepage' active={activeItem === ''} onClick={this.navToRoute} />
        <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.navToRoute} />
        {authenticated && <Menu.Item  name='logout' position='right' onClick={this.props.logoutUser} />}
        {!authenticated && <Menu.Item name='register' position='right' active={activeItem === 'register'} onClick={this.navToRoute} />}
        {!authenticated && <Menu.Item name='login' active={activeItem === 'login'} onClick={this.navToRoute} />}
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