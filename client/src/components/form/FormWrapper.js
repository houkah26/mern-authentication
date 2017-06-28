import React from 'react';

const divStyles = {
  maxWidth: "500px",
  margin: "0 auto"
}

const FormWrapper = (Component) => (
  <div style={divStyles}>
    <Component />
  </div>
)

export default FormWrapper;