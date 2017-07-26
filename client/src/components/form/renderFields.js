import React from "react";
import RenderField from "./RenderField";
import { Field } from "redux-form";

const renderFields = inputFields =>
  inputFields.map(field =>
    <Field
      name={field.name}
      type={field.type}
      component={RenderField}
      key={field.name}
    />
  );

export default renderFields;
