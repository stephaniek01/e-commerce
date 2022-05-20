import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInUserAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";

const SignInForm = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await signInUserAuthWithEmailAndPassword(email, password);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      )
        alert("Wrong credentials");

      console.log(error);
    }

    resetFormFields();
  };

  const signInWithGoogle = async () => {
    // response returns the user credentials
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="email"
          value={email}
          name="email"
          type="email"
          required
          onChange={onChangeHandler}
        />
        <FormInput
          label="password"
          value={password}
          name="password"
          type="password"
          required
          onChange={onChangeHandler}
        />

        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Sign in with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
