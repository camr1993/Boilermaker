/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const DisconnectedUserPage = (props) => {
  // if no user logged in and they try to go to '/user', they will be redirected to '/'
  if (!props.user.id) {
    return <Redirect to="/" />;
  }

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
    logout: () => console.log('logout'),
  };
};

export const UserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedUserPage);
