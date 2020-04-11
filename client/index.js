import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <div>Hello World</div>
  </Provider>,
  document.getElementById('app')
);
