import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createUserAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sign-up-form.styles";

const SignUpForm = () => {
  const defaultUserFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultUserFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultUserFields);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUserAuthWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("Email already exists");
      else console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Confirm password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeHandler}
          required
        />

        <Button type="submit">Submit</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
