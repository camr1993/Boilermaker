import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { UserPage } from './userPage';
import { checkForUserThunk } from '../redux/reducer';

class DisconnectedRoot extends Component {
  // this makes it so if the page is refreshed, we will get any currently logged in users off of '/auth/me' and put them on the state
  componentDidMount() {
    this.props.checkForUser();
  }

  render() {
    console.log('IS LOGGED IN', this.props.isLoggedIn);
    return (
      <div>
        <nav>
          Welcome!
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </nav>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          {/* The /user Route will only exist if we have a logged in user */}
          {this.props.isLoggedIn && (
            <Route path="/userhome" component={UserPage} />
          )}
          {/* Displays Login or UserPage Component as a fallback depending if logged in. This is made possible due to Switch */}
          {this.props.isLoggedIn ? (
            <Route component={UserPage} />
          ) : (
            <Route component={LoginForm} />
          )}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkForUser: () => dispatch(checkForUserThunk()),
  };
};

const Root = connect(mapStateToProps, mapDispatchToProps)(DisconnectedRoot);

export default Root;
