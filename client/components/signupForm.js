import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupThunk } from '../redux/reducer';

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
    this.props.history.push('/user');
  }
  render() {
    return (
      <div>
        <div>Sign Up: </div>
        <form onSubmit={this.handleSubmit}>
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
