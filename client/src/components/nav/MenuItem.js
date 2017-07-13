import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { startCase } from 'lodash';

const MenuItem = ({ name, active, onClick, icon, position = null, shouldRender = true, header = false }) => {
  const renderIcon = () => {
    if (icon) {
      return <Icon name={icon.name} size={icon.size} />
    }
  }

  if (header) {
    const underline = { textDecoration: 'underline' }; 
    /* use hidden '_' to render whitespace before username
    *  issue with semantic-ui not rendering whitespace between spans
    *  within a menu item  
    */
    const hidden = { visibility: 'hidden' };
    return (
      <Menu.Item header position={position}>
        <span>Logged in as </span>
        <span style={hidden}>{'_'}</span>
        <span style={underline}>{name}</span>
      </Menu.Item>
    )
  }
  
  return (
    <Menu.Item 
      name={name}
      active={active}
      onClick={onClick}
      position={position}
    >
      {renderIcon()}{startCase(name)}
    </Menu.Item>
  )
}

export default MenuItem;