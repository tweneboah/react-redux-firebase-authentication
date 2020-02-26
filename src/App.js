import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import Register from "./components/Forms/Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavbarDashboard />
        <Switch>
          <Route exact path="/" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
