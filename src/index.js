import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import store from "./redux/store";
import Theme from "./config/Theme";

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);
