import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './store/contexts/authContext';
import Bag from './components/bag/Bag';
import { GlobalStyle } from './App.styles';
import Navbar from './components/navbar/Navbar';
import Welcome from './components/welcome/Welcome';
import Signup from './components/welcome/signup/Signup';
import Login from './components/welcome/login/Login';

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
            <PublicRoute path='/login'>
              <Login />
            </PublicRoute>
            <PublicRoute path='/signup'>
              <Signup />
            </PublicRoute>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

const PublicRoute = ({ ...attrs }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...attrs}
      render={() =>
        auth.authenticated ? (
          /* <Bag /> */ <p>Authenticated</p>
        ) : (
          /* <Welcome /> */ <p>Welcome</p>
        )
      }
    ></Route>
  );
};

const PrivateRoute = ({ children, path, ...rest }: { children: any; path: string }) => {
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
