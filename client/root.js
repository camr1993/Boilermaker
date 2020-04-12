import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginForm } from './loginForm';
import { signupForm } from './signupForm';
import { home } from './home';
import { userPage } from './userPage';

class DisconnectedRoot extends Component {
  render() {
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
        <Route path="/login" component={loginForm} />
        <Route path="/signup" component={signupForm} />
        <Route path="/userpage" component={userPage} />
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const Root = connect(null, mapDispatchToProps)(DisconnectedRoot);

export default Root;
