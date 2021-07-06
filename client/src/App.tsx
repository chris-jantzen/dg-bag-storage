import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './store/contexts/authContext';
import Bag from './components/bag/Bag';
import { GlobalStyle } from './App.styles';
import Navbar from './components/navbar/Navbar';
import Welcome from './components/welcome/Welcome';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <PrivateRoute path='/bag'>
              <Bag />
            </PrivateRoute>
            <PublicRoute path='/welcome'>
              <Welcome />
            </PublicRoute>
            <PublicRoute path='/signin'>
              <p>Sign In</p>
            </PublicRoute>
            <PublicRoute path='/signup'>
              <p>Sign Up</p>
            </PublicRoute>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

interface RouteInput {
  children: any;
  path: string,
  attrs?: string;
}
const PublicRoute = ({ children, path, ...attrs }: RouteInput) => {
  return (
    <Route {...attrs}>{children}</Route>
  );
};

const PrivateRoute = ({ children, path, ...rest }: RouteInput) => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <Route
      {...rest}
      path={path}
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

export default App;
