import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Navbar from "./components/shared/Navbar/Navbar";
import App from "./App";
// import Footer from "./components/shared/Footer/Footer";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Navbar /> */}
      <App />
      {/* <Footer /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
