import React from 'react';
import Map from './containers/Map/GoogleMap';
import {connect} from 'react-redux';
import {Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

function App(props) {
 return (
  <ConnectedRouter history={props.history}>
    <div className='App'>
      <Switch>
        <Route path='/map' exact component={Map}/>
      </Switch>
    </div>
  </ConnectedRouter>
 );
}
export default App;
