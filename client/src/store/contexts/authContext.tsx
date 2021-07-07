import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export interface IAuthContextProps {
  auth: AuthState;
  dispatch: (value: Action) => void;
}

type AuthState = {
  authenticated: boolean;
  authError: string | null;
};

const initState = {
  authenticated: false,
  authError: null,
};

export enum ActionType {
  SIGN_IN_SUCCESSFUL = 'SIGN_IN_SUCCESSFUL',
  SIGN_IN_ERROR = 'SIGN_IN_ERROR',
  SIGN_OUT = 'SIGN_OUT',
}

export type Action =
  | { type: ActionType.SIGN_IN_SUCCESSFUL | ActionType.SIGN_OUT }
  | { type: ActionType.SIGN_IN_ERROR; message: string };

export const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN_SUCCESSFUL:
      return {
        ...state,
        authenticated: true,
      };
    case ActionType.SIGN_IN_ERROR:
      return {
        ...state,
        authError: action.message,
      };
    case ActionType.SIGN_OUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
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
