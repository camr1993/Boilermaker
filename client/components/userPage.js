/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutThunk } from '../redux/reducer';

const DisconnectedUserPage = (props) => {
  return (
    <div>
      <div>User Page</div>
      <div>{props.user.email}</div>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutThunk()),
  };
};

export const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedUserPage);
