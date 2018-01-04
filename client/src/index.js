import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

const Index = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);


ReactDOM.render(<Index />, document.getElementById('root'));
