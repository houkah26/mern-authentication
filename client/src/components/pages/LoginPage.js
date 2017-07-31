import React from "react";
import LoginForm from "../form/LoginForm";

const divStyles = {
  maxWidth: "300px",
  margin: "0 auto"
};

const LoginPage = () =>
  <div style={divStyles}>
    <LoginForm />
  </div>;

export default LoginPage;
