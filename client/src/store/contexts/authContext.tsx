import React, { createContext, useReducer } from 'react';
import { authReducer, Action } from '../reducers/authReducer';

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export interface IAuthContextProps {
  auth: AuthState;
  dispatch: (value: Action) => void;
}

export type AuthState = {
  authenticated: boolean;
  authError: string | null;
};

const initState = {
  authenticated: false,
  authError: null,
};

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, dispatch] = useReducer(authReducer, initState);

  // const authStatus = (signedIn: boolean, message?: string) => {
  // if (signedIn) {
  //   dispatch({ type: SIGN_IN_SUCCESSFUL, authenticated: true })
  // } else {
  //   dispatch({ type: SIGN_IN_ERROR, message })
  // }
  // console.log('authStatus')
  // }
  // const signOut = () => {
  //   dispatch({ type: SIGN_OUT, authenticated: false })
  //   console.log('sign out')
  // }

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>{children}</AuthContext.Provider>
  );
};
