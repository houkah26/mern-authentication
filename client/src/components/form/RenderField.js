import React from 'react';
import { Form } from 'semantic-ui-react';
import { startCase } from 'lodash';

const RenderField = field => {
  const { touched, error } = field.meta;
  const input = field.input;
  const name = input.name;
  const type = name === "password" ? "password" : "text";
  const displayError = touched && error && true;

  return (
    <Form.Field error={displayError}>
      <label>{startCase(name)}</label>
      <input type={type} {...input}/>
      {displayError && 
      <span style={{ "color": "#9F3A38" }} className="error">{error}</span>}
    </Form.Field>  
  );
}

export default RenderField;