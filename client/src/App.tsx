import { BrowserRouter, Switch } from 'react-router-dom';

import { BaseRoute, PrivateRoute, PublicRoute } from './utils/routerUtils';
import { AuthContextProvider } from './store/contexts/authContext';
import Bag from './views/bag/Bag';
import Navbar from './components/navbar/Navbar';
import Welcome from './views/welcome/Welcome';
import Signup from './views/signup/Signup';
import Login from './views/login/Login';

const App = () => {
  return (
    <>
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
