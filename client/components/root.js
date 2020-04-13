import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { home } from './home';
import { UserPage } from './userPage';

const Root = () => {
  return (
    <Router>
      <nav>
        Welcome!
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>
      <Route exact path="/" component={home} />
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/user" component={UserPage} />
    </Router>
  );
};

export default Root;
