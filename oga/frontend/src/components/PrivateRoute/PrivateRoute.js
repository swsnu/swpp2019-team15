/**
 * Summary.
 * PrivateRoute component for authenticated access.
 *
 * Description.
 * This component serves as a wrapper to <Route>
 * If the user is authenticated(checked by auth reducer's authenticated),
 * the user is directed to the correct Component.
 * Otherwise, the user is redirected to the login page.
 * MapSearchBox component that provides recommendations near the map location.
 * @author taehioum
 * @since  2019-10-25
 **/
 
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {connect} from 'react-redux';

const PrivateRoute = ({auth: auth, component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        if (auth) {
          return <Component {...props} />;
        } else
          return <Redirect to="/login" />;
      }}/>
);

export default PrivateRoute;
