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
