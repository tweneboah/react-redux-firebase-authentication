import React, { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { auth } from "../../../config/firebaseUtil";

const PublicNavbar = () => {
  //Tabs
  const [tabsValue, setTabsValue] = useState(0);
  //Onchange
  const handleChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  return (
    <React.Fragment>
      <AppBar color="primary">
        <Toolbar>
          <Tabs value={tabsValue} onChange={handleChange}>
            <Tab label="Home" component={Link} to="/" />
            <Tab label="Register" component={Link} to="/register" />
            <Tab label="Login" component={Link} to="/login" />
            <Tab label="Logout" onClick={() => auth.signOut()} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <div style={{ marginBottom: "60px" }}></div>
    </React.Fragment>
  );
};

export default PublicNavbar;
