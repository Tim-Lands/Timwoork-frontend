import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import SupportEngine from '../SupportEngine';
import SupportAdmin from './SupportAdmin';

const path = window.location.pathname

ReactDOM.render(
  <React.StrictMode>
    { path.indexOf('/support') === -1 ? <SupportEngine /> : <SupportAdmin /> }
  </React.StrictMode>,
  document.getElementById('root')
);
