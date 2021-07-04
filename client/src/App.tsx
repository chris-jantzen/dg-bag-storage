import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext, AuthContextProvider } from './store/contexts/authContext'
import Bag from './components/bag/Bag'
import { GlobalStyle } from './App.styles'

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path='/bag'>
              <Bag />
            </PrivateRoute>
            <PublicRoute path='/welcome'>
              <p>Welcome</p>
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
  )
}

const PublicRoute = ({ ...attrs }) => {
  const { auth } = useContext(AuthContext)
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
  )
}

const PrivateRoute = ({ children, path, ...rest }: { children: any, path: string }) => {
  const { auth } = useContext(AuthContext)
  console.log(auth)
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
  )
}

export default App
