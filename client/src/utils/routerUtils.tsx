import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { pickBy } from 'lodash';
import { AuthContext } from '../store/contexts/authContext';
import Bag from '../components/bag/Bag';
import Welcome from '../components/welcome/Welcome';

interface RouteInput {
  children: any;
  path: string;
  exact?: boolean;
  location?: any;
}

const configureInput = (input: RouteInput) => {
  const attrs = pickBy(input, (_: any, key: string) => {
    return key !== 'children';
  });
  return { attrs, children: input.children };
};

export const BaseRoute = (input: { path: string; exact: boolean }) => {
  const { auth } = useContext(AuthContext);
  return <Route {...input}>{auth.authenticated ? <Bag /> : <Welcome />}</Route>;
};

export const PublicRoute = ({ children, path, exact }: RouteInput) => {
  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export const PrivateRoute = (input: RouteInput) => {
  const { attrs, children } = configureInput(input);
  const { auth } = useContext(AuthContext);
  // console.log(auth);
  return (
    <Route
      {...attrs}
      render={({ location }) =>
        auth.authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/welcome',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
