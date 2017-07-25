import React from 'react';

import AddFundForm from '../../form/AddFundForm';

const divStyles = {
  maxWidth: "300px",
  margin: "0 auto"
}

const AddFunds = () => (
  <div style={divStyles}>
    <AddFundForm />
  </div>
)

export default AddFunds;