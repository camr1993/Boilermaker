/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { logoutThunk } from '../redux/reducer';

const DisconnectedUserPage = (props) => {
  return (
    <div className="container-1">
      <h2>You Are Logged In!</h2>
      <div>Email: {props.user.email}</div>
      <button
        onClick={() => {
          props.logout();
        }}
      >
        Logout
      </button>
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
