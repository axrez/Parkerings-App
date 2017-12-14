import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

class Index extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
