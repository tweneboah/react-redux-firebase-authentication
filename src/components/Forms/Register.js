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
