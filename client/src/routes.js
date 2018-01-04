import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import BeepBoop from './components/BeepBoop';
import Help from './components/Help';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={BeepBoop} />
      <Route exact path="/help" component={Help} />
      <Route path="*" component={NotFound} />
    </Switch>
  </main>
);


export default Routes;
