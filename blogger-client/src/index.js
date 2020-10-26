import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import AppRouter from './Router/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
