import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery/src/jquery';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
