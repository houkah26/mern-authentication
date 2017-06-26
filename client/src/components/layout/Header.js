import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { logoutUser, changeRoute } from '../../actions';


class Header extends Component {
  handleItemClick = (e, { name }) => {
    const route = name === 'homepage' ? '/' : '/' + name;
    this.props.changeRoute(route);
  }

  render() {
    const activeItem = this.props.currentPath.slice(1);

    return (
      <Menu className='header' inverted size='huge'>
        <Menu.Item name='homepage' active={activeItem === ''} onClick={this.handleItemClick} />
        <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
          <Menu.Item name='register' active={activeItem === 'register'} onClick={this.handleItemClick} />
          <Menu.Item name='logout' onClick={this.props.logoutUser} />
        </Menu.Menu>
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

export default connect(mapStateToProps, { logoutUser, changeRoute })(Header);