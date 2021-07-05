import { AuthState } from '../contexts/authContext';

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
