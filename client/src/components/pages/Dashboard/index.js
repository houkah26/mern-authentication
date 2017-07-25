import React from 'react';
import { Segment } from 'semantic-ui-react';

import NavMenu from '../../nav/dashboard/NavMenu';
import Routes from './Routes';

const Dashboard = ({ match }) => (
  <div>
    <NavMenu />
    <Segment attached='bottom'>
      <Routes />
    </Segment>
  </div>
)

export default Dashboard;