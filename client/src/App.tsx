import { BrowserRouter, Switch } from 'react-router-dom';

import { BaseRoute, PrivateRoute, PublicRoute } from './utils/routerUtils';
import { GlobalStyle } from './App.styles';
import { AuthContextProvider } from './store/contexts/authContext';
import Bag from './components/bag/Bag';
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
            <BaseRoute path='/' exact={true} />
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

export default App;
