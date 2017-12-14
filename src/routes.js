import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import BeepBoop from './components/BeepBoop';

class Routes extends React.Component{
  render(){
    return(
      <main>
        <Switch>
          <Route exact path="/" component={BeepBoop} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Routes
