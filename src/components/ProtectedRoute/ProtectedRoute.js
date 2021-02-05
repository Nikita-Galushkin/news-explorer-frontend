import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props  }) {
  return (
    <Route path={props.path}>
      {() => props.loggedIn === true
        ? <>
          {props.children}
        </>
        : <Redirect to={{ pathname: "/", state: { noAuthRedirected: true } }} />
      }
    </Route>
  );
}

export default ProtectedRoute;