import axios from 'axios';
import history from '../history';

// action types
const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';
const LOGOUT = 'LOGOUT';
const CHECK_FOR_USER = 'CHECK_FOR_USER';

// action creators/thunks
const login = (userObj) => ({
  type: LOGIN,
  userObj,
});

export const loginThunk = (userObj) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/auth/login', userObj);
      dispatch(login(data));
      history.push('/userhome');
    } catch (error) {
      console.log('Login Error');
      dispatch(login({ error: error }));
    }
  };
};

const signup = (userObj) => ({
  type: SIGNUP,
  userObj,
});

export const signupThunk = (userObj) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/auth/signup', userObj);
      dispatch(signup(data));
      history.push('/userhome');
    } catch (error) {
      console.log('Signup Error: ', error);
    }
  };
};

const logout = () => ({
  type: LOGOUT,
});

export const logoutThunk = () => {
  return async (dispatch) => {
    try {
      await axios.delete('/auth/logout');
      dispatch(logout());
      history.push('/login');
    } catch (error) {
      console.log('Logout Error: ', error);
    }
  };
};

export const checkForUser = (userObj) => ({
  type: CHECK_FOR_USER,
  userObj,
});

export const checkForUserThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/auth/me');
      dispatch(checkForUser(data));
    } catch (error) {
      console.log('User Check Error: ', error);
    }
  };
};

// initial state
const initialState = {
  user: {},
};

// reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.userObj,
      };
    case SIGNUP:
      return {
        ...state,
        user: action.userObj,
      };
    case LOGOUT:
      return initialState;
    case CHECK_FOR_USER:
      return {
        ...state,
        user: action.userObj,
      };
    default:
      return state;
  }
};
