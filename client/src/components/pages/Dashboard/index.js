import React from 'react';

import NavMenu from '../../nav/dashboard/NavMenu';
import Routes from './Routes';

const Dashboard = ({ match }) => (
  <div>
    <NavMenu />
    <Routes />
  </div>
)

export default Dashboard;