import { createContext, useContext, useReducer } from 'react';

export const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export interface IAuthContextProps {
  auth: AuthState;
  dispatch: (value: Action) => void;
  authenticate: (value: boolean) => void;
}

type AuthState = {
  isAuthenticated: boolean;
  authError: string | null;
};

const initState = {
  isAuthenticated: false,
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

export const useAuth = () => {
  return useContext<IAuthContextProps>(AuthContext);
};

export const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN_SUCCESSFUL:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ActionType.SIGN_IN_ERROR:
      return {
        ...state,
        authError: action.message,
      };
    case ActionType.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
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

  const authenticate = (success: boolean) => {
    if (success) {
      dispatch({ type: ActionType.SIGN_IN_SUCCESSFUL });
    } else {
      dispatch({ type: ActionType.SIGN_IN_ERROR, message: 'Error Logging In' });
    }
  };

  // const authStatus = (signedIn: boolean, message?: string) => {
  // if (signedIn) {
  //   dispatch({ type: SIGN_IN_SUCCESSFUL, isAuthenticated: true })
  // } else {
  //   dispatch({ type: SIGN_IN_ERROR, message })
  // }
  // console.log('authStatus')
  // }
  // const signOut = () => {
  //   dispatch({ type: SIGN_OUT, isAuthenticated: false })
  //   console.log('sign out')
  // }

  return (
    <AuthContext.Provider value={{ auth, dispatch, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};
