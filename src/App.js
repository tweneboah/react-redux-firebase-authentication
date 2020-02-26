import React, { useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavbarDashboard from "./components/Navbar/NavbarDashboard";
import Register from "./components/Forms/Register";
import HomePage from "./components/HomePage";
import LoginForm from "./components/Forms/LoginForm";
import { auth, createUserDocumentProfile } from "./config/firebaseUtil";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/actions/userActions";

const App = ({ setCurrentUser }) => {
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        console.log("Login");
        //We will run our action here becuase when a user is login
        //The user will be available her but the user contains many object so we will pass it to this function to grab what we want
        //Remember that the return value from our function is reference to the user

        //On queryReference we can attach it set and onSnapShot to,
        //Determine if the user exist

        //If the user exists we can attach onSnapShot to detemine if the user exists and we can see the id and exists property set to true

        //To get the actual data we attach .data() on the return value to get actual data our function is returning

        //Therefore in there then we call our action creator

        const userRef = await createUserDocumentProfile(user);
        userRef.onSnapshot((user) => {
          user = {
            id: user.id,
            ...user.data()
          };
          setCurrentUser(user);
        });
      } else {
        // User is signed out.
        console.log("Logout");
        //We want to set the state to null when a user logos out
        setCurrentUser(undefined);
      }
    });
  });
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
const actions = {
  setCurrentUser
};

export default connect(null, actions)(App);
