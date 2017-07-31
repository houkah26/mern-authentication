import React from "react";

import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";

import "./index.css";

const Layout = () =>
  <div className="layout-container">
    <Header />
    <MainContent />
    <Footer />
  </div>;

export default Layout;
