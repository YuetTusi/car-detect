import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const $app = document.getElementById('app') as HTMLElement;

ReactDOM.createRoot($app).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
