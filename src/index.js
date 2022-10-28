import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { Store } from './reduxfeatures/Store';
import registerServiceWorker from "./registerServiceWorker";
const root = ReactDOM.createRoot(document.getElementById('root'));
//when using react strict mode the page renders twice
//erase the tah react.strict mode to only render once
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
registerServiceWorker();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
