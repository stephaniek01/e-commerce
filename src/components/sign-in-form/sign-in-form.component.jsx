import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  createUserDocumentFromAuth,
  signInUserAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context";

import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";

const SignInForm = () => {
  const { setCurrentUser } = useContext(UserContext);

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
      const { user } = await signInUserAuthWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);
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
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
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
