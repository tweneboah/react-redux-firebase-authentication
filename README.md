# STEPS:

## Create your Registration Form

- In my case i used material-ui and react hook form

* Using React-Hook-form takes away most of the burden when creating forms in react. React-Hook-Forms makes it easier to create forms in react because it takes care of inputChange, validation and many other important utilities

* The material-UI gives it a nice looking

*  React-Hook-Form has a utility function called Controller which helps to use other library like MUI instead of the native input fields and this Utility injects all the functions from the React-Hook-Form

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
2.  control={control} // Inject utitlies like registration
3. as //Takes TextField Component
4. name
5. rules={{ required: true }} //Validation
