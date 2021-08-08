import { BrowserRouter, Switch } from 'react-router-dom';

import { BaseRoute, PrivateRoute, PublicRoute } from './utils/routerUtils';
import { AuthContextProvider } from './store/contexts/authContext';
import Home from './views/home/Home';
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
            <PrivateRoute path='/home'>
              <Home />
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
