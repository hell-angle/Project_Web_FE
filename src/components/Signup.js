import React, { useState } from 'react';
import Card from "./UI/Card/Card";
import classes from "./Login/Login.module.css";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";
import useInput from "./../hooks/use-input";

const Signup = (props) => {
 const [formIsValid, setFormIsValid] = useState(false);
 const [emailError, setEmailError] = useState('');

 const {
   value: enteredName,
   hasError: nameHasError,
   valueChangeHandler: nameInputHandler,
   reset: resetName,
 } = useInput((value) => value.length > 3);

 const {
   value: enteredEmail,
   hasError: emailHasError,
   valueChangeHandler: emailInputHandler,
   reset: resetEmail,
 } = useInput((value) =>
   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
 );

 const {
   value: enteredPassword,
   hasError: passwordHasError,
   valueChangeHandler: passwordInputHandler,
   reset: resetPassword,
 } = useInput((value) => value.length > 7);

 const nameInputHandlerWrapper = (event) => {
  nameInputHandler(event);
  checkFormValidity();
 };
 
 const emailInputHandlerWrapper = (event) => {
  emailInputHandler(event);
  checkFormValidity();
 };
 
 const passwordInputHandlerWrapper = (event) => {
  passwordInputHandler(event);
  checkFormValidity();
 };
 
 const checkFormValidity = () => {
  const nameIsValid = enteredName.length >= 3;
  const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(enteredEmail);
  const passwordIsValid = enteredPassword.length >= 8;
  setFormIsValid(nameIsValid && emailIsValid && passwordIsValid);
  if (!emailIsValid) {
    setEmailError('Not a valid email');
  } else {
    setEmailError('');
  }
 };
 
 const submitHandler = (event) => {
  event.preventDefault();
  if (formIsValid) {
    props.addUser({
      name: enteredName,
      email: enteredEmail.toLowerCase(),
      password: enteredPassword,
    });
    resetName();
    resetEmail();
    resetPassword();
  }
 };
 
 return (
  <Card className={classes.login}>
    <form onSubmit={submitHandler}>
      <Input
        id="name"
        label="Name"
        type="text"
        onChange={nameInputHandlerWrapper}
        isValid={!nameHasError}
      />
      <Input
        id="email"
        label="E-mail"
        type="email"
        onChange={emailInputHandlerWrapper}
        isValid={!emailHasError}
      />
      {emailError && <p>{emailError}</p>}
      <Input
        id="password"
        label="Password"
        type="password"
        onChange={passwordInputHandlerWrapper}
        isValid={!passwordHasError}
      />
      <h6 className={classes.error}>{props.error}</h6>
      <div className={classes.actions}>
        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
          Sign Up
        </Button>
      </div>
    </form>
  </Card>
 );
 };
 
 export default Signup;