import React from 'react';

const Checkbox = ({ input, label, type, meta: { touched, error } }) => (
  <div className="field">
    <div className="ui checkbox">
      <input type="checkbox" tabIndex="0" {...input}/>
      <label>{label}</label>
      {touched && error &&
      <span style={{ "color": "#9F3A38" }} className="error">{error}</span>}
    </div>
  </div>
)

export default Checkbox;