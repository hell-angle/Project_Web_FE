import React from "react";
import Card from "../components/UI/Card/Card";
import classes from "../components/Home/Home.module.css";
import Button from "../components/UI/Button/Button";
import { Link } from "react-router-dom";

const IndexPage = (props) => {
  return (
    <div className={classes.center}>
      <Card className={classes.home}>
        <div className={classes.introSection}>
          <h1>Welcome to AI Chat</h1>
          <p>
            Introducing your personalized digital assistant, here to simplify
            your life and enhance your daily interactions
          </p>
          <div className={classes.buttons}>
            <Link to="/user/login">
              <Button>User Login</Button>
            </Link>
            <Link to="/user/signup">
              <Button>User Sign Up</Button>
            </Link>
            <Link to="/admin/login">
              <Button>Admin Login</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IndexPage;
