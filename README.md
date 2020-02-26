# STEPS:

## Create your Registration Form

- In my case i used material-ui and react hook form

* Using React-Hook-form takes away most of the burden when creating forms in react. React-Hook-Forms makes it easier to create forms in react because it takes care of inputChange, validation and many other important utilities

* The material-UI gives it a nice looking

* React-Hook-Form has a utility function called Controller which helps to use other library like MUI instead of the native input fields and this Utility injects all the functions from the React-Hook-Form

## CODE DEMO

```js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";

const Register = () => {
  const { register, control, handleSubmit, errors } = useForm({
    displayName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submitData = (user) => {
    console.log(user);
  };
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <h1>Register</h1>
      <Controller
        defaultValue=""
        control={control}
        as={<TextField label="first name" placeholder="name" />}
        name="firstname"
        rules={{ required: true }}
      />
      {errors.firstname && <span>This field is required</span>}
      <Button type="submit">Register</Button>
    </form>
  );
};

export default Register;
```

# Controller Props

1. defaultValue //Initial Value
2. control={control} // Inject utitlies like registration
3. as //Takes TextField Component
4. name
5. rules={{ required: true }} //Validation

# Firebase Configuration

```js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-uOhsx0lBzeC_wXNSrNIQEIAqvT8rmUw",
  authDomain: "react-ecommerce-47c19.firebaseapp.com",
  databaseURL: "https://react-ecommerce-47c19.firebaseio.com",
  projectId: "react-ecommerce-47c19",
  storageBucket: "react-ecommerce-47c19.appspot.com",
  messagingSenderId: "683932121883",
  appId: "1:683932121883:web:b01dd48e008233fffd71be",
  measurementId: "G-0H0VZ5SEQR"
};

firebase.initializeApp(firebaseConfig);

//Export auth
export const auth = firebase.auth();
//Export firestore database
export const firestore = firebase.firestore();

//SIGN IN WITH GOOGLE
//=============================

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ propmt: "select_account" });

  try {
    const userRef = auth.signInWithPopup(provider);

    return userRef;
  } catch (error) {
    console.log(error.message);
  }
};

//SAVE THE USER INTO OUR DATABASE

export const createUserDocumentProfile = async (userAuth, otherProperties) => {
  //Destructure the userAuth
  //These are the properties we want store into our database
  //When a user logins there are alot of properties we will destructure it and decide what we need to store into our database.
  //So when the user logs in we will destructure the user object like this {user} that's why we are returning the useRef becuase when a user login using googleAuth or any other provider we get the user back so we can await the user and pass it to this function and store it into our database

  //This function we will take the return user when login using GoogleAuth and when a user sign up using email and password.

  //Remember that auth property that firebase gives when a user signup or login using googleAuth are different

  //PROPERTIES WHEN A USER SIGN UP USING GOOGLEAUTH

  //1. displayName
  //2. email
  //3. photoURL

  //PROPERTIES WHEN A USER SIGN UP USING EMAIL AND PASSWORD
  //1. displayName
  //2. email = undefined
  //3. photoURL

  //So how can we update displayName and add more fields to it, because of that we will pass another argument to this function but instead of using just a variable we will use object spreading and this will update any property and add

  //NOTE:
  //Remember that create a user using Email and Password also returns the created object so we will destructure the user and pass it to this function

  const { email, displayName, photoURL } = userAuth;
  if (!userAuth) return;

  try {
    //Chect the path in our db
    const userRef = firestore.collection("users").doc(userAuth.uid);
    const snapshot = await userRef.get();

    if (snapshot.exists === false) {
      await userRef.set({
        email: email,
        photoURL: photoURL,
        displayName: displayName,
        createdAt: new Date(),
        ...otherProperties
      });
    }

    //We want to return the created user from this function because in our react app we may need it for other purpose
    return userRef;
  } catch (error) {
    console.log(error.message);
  }
};

export default firebase;
```

# Sign Up Component

```js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid } from "@material-ui/core";
import { auth, createUserDocumentProfile } from "../../config/firebaseUtil";

const Register = () => {
  const { control, handleSubmit, errors } = useForm({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submitData = async (userAuth) => {
    const { displayName, email, password } = userAuth;
    try {
      //We have to des
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentProfile(user, { displayName });
      console
        .log(user)

        .catch(function(error) {});
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <h1>Login to YourAccount </h1>
        </Grid>

        <Grid>
          <Controller
            defaultValue=""
            control={control}
            as={
              <TextField
                type="ematextil"
                label="Display Name"
                placeholder="Enter Your  Display Name"
              />
            }
            name="displayName"
            rules={{ required: true }}
          />
        </Grid>
        <Grid>
          <Controller
            defaultValue=""
            control={control}
            as={
              <TextField
                type="email"
                label="Email"
                placeholder="Enter Your  Email"
              />
            }
            name="email"
            rules={{ required: true }}
          />
        </Grid>
        <Grid>{errors.email && <span>This field is required</span>}</Grid>
        <Grid>
          <Controller
            defaultValue=""
            control={control}
            as={
              <TextField
                type="password"
                label="Password"
                placeholder="Enter Your Password"
              />
            }
            name="password"
            rules={{ required: true }}
          />
        </Grid>
        <Grid>{errors.password && <span>This field is required</span>}</Grid>
        <Grid>
          <Button type="submit" color="secondary" variant="contained">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;
```

# Login Component

```js
import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import {
  signInWithGoogle,
  createUserDocumentProfile
} from "../../config/firebaseUtil";

const LoginForm = () => {
  const { control, handleSubmit, errors } = useForm({
    email: "",
    password: ""
  });

  const login = async () => {
    const { user } = await signInWithGoogle();
    const yes = await createUserDocumentProfile(user);
    console.log(yes);
  };

  const submitData = (user) => {
    console.log(user);
  };
  return (
    <form onSubmit={handleSubmit(submitData)}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <h1>Login to YourAccount </h1>
        </Grid>
        <Grid>
          <Controller
            defaultValue=""
            control={control}
            as={
              <TextField
                type="email"
                label="Email"
                placeholder="Enter Your  Email"
              />
            }
            name="email"
            rules={{ required: true }}
          />
        </Grid>
        <Grid>{errors.email && <span>This field is required</span>}</Grid>
        <Grid>
          <Controller
            defaultValue=""
            control={control}
            as={
              <TextField
                type="password"
                label="Password"
                placeholder="Enter Your Password"
              />
            }
            name="password"
            rules={{ required: true }}
          />
        </Grid>
        <Grid>{errors.password && <span>This field is required</span>}</Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Button type="submit" color="primary" variant="contained">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={login} color="secondary" variant="contained">
                Login With Google
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
```
