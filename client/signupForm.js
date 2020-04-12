import React, { Component } from 'react';

export class signupForm extends Component {
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
  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target.value);
    // THUNK HERE!
    this.setState({
      email: '',
      password: '',
    });
  }
  render() {
    return (
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
    );
  }
}
