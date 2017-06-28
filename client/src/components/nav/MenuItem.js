import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { startCase } from 'lodash';

const MenuItem = ({ name, activeItem, onClick, icon, position, shouldRender }) => {
  const renderIcon = () => {
    if (icon) {
      return <Icon name={icon.name} size={icon.size} />
    }
  }

  const routeName = name === 'homepage' ? '' : name;
  const active = activeItem === routeName;

  // Return null if item should not render
  if (!shouldRender) {
    return null;
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