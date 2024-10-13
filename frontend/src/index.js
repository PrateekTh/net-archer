import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './stylesheets/base.css'
import './stylesheets/ui-functions.css'
import './stylesheets/ui-graph.css'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
