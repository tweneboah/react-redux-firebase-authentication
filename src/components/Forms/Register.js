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
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;
