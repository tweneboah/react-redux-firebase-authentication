import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import Register from "./components/Forms/Register";
import HomePage from "./components/HomePage";
import LoginForm from "./components/Forms/LoginForm";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavbarDashboard />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={LoginForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
