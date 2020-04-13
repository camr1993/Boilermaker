import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Root from './components/root';
import '../public/index.css'; // this injects our stylesheet into the html that we are rendering everything on. Webpack bundles all the css files starting from client/index.js and puts it in bundle.js, which html has in its script tag. Basically does the same thing as linking our stylesheet to the html, except now we can have multiple css files (which tbh I don't really like doing)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
);
