import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginThunk } from '../redux/reducer';
import { OauthLoginForm } from './oauthLoginForm';

class DisconnectedLoginForm extends Component {
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
    await this.props.login(this.state);
    this.setState({
      email: '',
      password: '',
    });
  }
  render() {
    return (
      <div>
        <h2>LOGIN: </h2>
        {this.props.error && (
          <div className="error-message">
            Username or password is incorrect!
          </div>
        )}
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

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => dispatch(loginThunk(obj)),
  };
};

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedLoginForm);
