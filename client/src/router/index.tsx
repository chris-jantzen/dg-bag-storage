import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { defaultQueryFn } from '../api';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from '../assets/theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BaseRoute, PrivateRoute, PublicRoute } from '../utils/routerUtils';
import Home from '../views/home/Home';
import Navbar from '../components/navbar/Navbar';
import Signup from '../views/signup/Signup';
import Login from '../views/login/Login';
import { AuthContextProvider } from '../store/contexts/authContext';

const Welcome = lazy(() => import('../views/welcome/Welcome'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const IndexRouter: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <Router>
            <Navbar />
            <Box height='calc(100vh - 50px)' width='full'>
              <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                  <Route
                    exact
                    // path={`${process.env.PUBLIC_URL}/`}
                    path='/welcome'
                    component={Welcome}
                  />
                  <BaseRoute path='/' exact={true} />
                  <PrivateRoute path='/home'>
                    <Home />
                  </PrivateRoute>
                  <PublicRoute path='/login'>
                    <Login />
                  </PublicRoute>
                  <PublicRoute path='/signup'>
                    <Signup />
                  </PublicRoute>
                </Switch>
              </Suspense>
            </Box>
          </Router>
        </AuthContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default IndexRouter;
