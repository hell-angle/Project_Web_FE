import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import useInput from '../../hooks/use-input';

const Login = (props) => {
  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailInputHandler,
    reset: resetEmail,
  } = useInput((value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) // asdsa@
  );

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordInputHandler,
    reset: resetPassword,
  } = useInput((value) => value.length > 7);

  const submitHandler = (event) => {
    event.preventDefault();
  
    if (!emailIsValid || !passwordIsValid) {
      // Show alert for incorrect login
      alert('Incorrect username and/or password! Please try again.');
      // Clear input fields for easier re-entry
      resetEmail();
      resetPassword();
      return; // Prevent further processing
    }
  
    // User input is valid, proceed with login logic
    props.logger(enteredEmail.toLowerCase(), enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          onChange={emailInputHandler}
          isValid={!emailHasError}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          onChange={passwordInputHandler}
          isValid={!passwordHasError}
        />
        <h6 className={classes.error}>{props.error}</h6>

        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!emailIsValid || !passwordIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
