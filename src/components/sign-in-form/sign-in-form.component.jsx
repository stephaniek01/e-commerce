import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createUserDocumentFromAuth,
  signInUserAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

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
      const response = await signInUserAuthWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
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
    <div className="sign-up-container">
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
