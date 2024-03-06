import React from 'react';
import ReactDOM from 'react-dom/client';


import './index.css';
import './assets/styles/bootstrap.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import  store  from '../src/store.js'
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
  <Provider store={store}>
     <PayPalScriptProvider deferLoading={true}>
    
  <BrowserRouter>
 
    <App />
    
    </BrowserRouter>
    </PayPalScriptProvider>
   </Provider> 
   </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
