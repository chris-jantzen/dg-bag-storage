import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { pickBy } from 'lodash';
import { useAuth } from '../store/contexts/authContext';
import Bag from '../views/bag/Bag';
import Welcome from '../views/welcome/Welcome';

interface RouteInput {
  children: React.ReactNode;
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
  const { auth } = useAuth();
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
  const { auth } = useAuth();
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
