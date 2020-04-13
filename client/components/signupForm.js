import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupThunk } from '../redux/reducer';
import { OauthLoginForm } from './oauthLoginForm';

class DisconnectedSignupForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    await this.props.signup(this.state);
    this.setState({
      email: '',
      password: '',
    });
    // basically an easier way of doing an onClick or Link
    this.props.history.push('/userhome');
  }
  render() {
    return (
      <div>
        <h2>SIGN UP: </h2>
        <form onSubmit={this.handleSubmit} className="form-container">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <OauthLoginForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (obj) => dispatch(signupThunk(obj)),
  };
};

export const SignupForm = connect(
  null,
  mapDispatchToProps
)(DisconnectedSignupForm);
