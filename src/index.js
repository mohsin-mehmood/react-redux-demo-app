import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "../src/components/App";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "../src/redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
