import React from 'react';

// so I think this doesn't need to go to the reducer because passport puts the google user on req.user, and the componentDidMount will get that user

export const OauthLoginForm = (props) => {
  return (
    <form method="get" action="/auth/google" className="form-container">
      <button type="submit" className="google-button">
        Login with Google
      </button>
    </form>
  );
};
