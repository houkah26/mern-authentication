import React from "react";
import RegisterForm from "../form/RegisterForm";

const divStyles = {
  maxWidth: "400px",
  margin: "0 auto"
};

const RegisterPage = () =>
  <div style={divStyles}>
    <RegisterForm />
  </div>;

export default RegisterPage;
