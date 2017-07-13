import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { startCase } from 'lodash';

const MenuItem = ({ name, active, onClick, icon, position = null, shouldRender = true, header = false, headerContent }) => {
  const renderIcon = () => {
    if (icon) {
      return <Icon name={icon.name} size={icon.size} />
    }
  }

  if (header) {
    return (
      <Menu.Item header position={position}>
        {headerContent}
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