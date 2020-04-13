import axios from 'axios';

// action types
const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';

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
    } catch (error) {
      console.log('Login Error: ', error);
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
    } catch (error) {
      console.log('Signup Error: ', error);
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
    default:
      return state;
  }
};
