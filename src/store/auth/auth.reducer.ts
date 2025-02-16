import { IUser } from "@/api/types";
import { AuthError } from "@/utils/errors.utils";
import { AuthAction } from "./auth.actions";
import { AUTH_ACTION_TYPES } from "./auth.types";

export type AuthState = {
  currentUser: IUser | null;
  isLoading: boolean;
  error: AuthError | null;
  navigateToSignin: boolean;
};

const authStateInitialValues: AuthState = {
  currentUser: null,
  isLoading: false,
  error: null,
  navigateToSignin: false,
};

export const authReducer = (
  state = authStateInitialValues,
  action: AuthAction | { type: string; payload?: unknown }
): AuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.EMAIL_SIGNIN_START:
    case AUTH_ACTION_TYPES.GOOGLE_SIGNIN_START:
    case AUTH_ACTION_TYPES.REGISTER_START:
    case AUTH_ACTION_TYPES.UPDATE_USER_START:
    case AUTH_ACTION_TYPES.LOGOUT_START:
      return { ...state, isLoading: true };

    case AUTH_ACTION_TYPES.REGISTER_SUCCESS:
      return { ...state, isLoading: false, navigateToSignin: true };
    case AUTH_ACTION_TYPES.CLEAR_NAVIGATE_TO_SIGN_IN:
      return { ...state, navigateToSignin: false };

    case AUTH_ACTION_TYPES.REGISTER_FAILURE:
    case AUTH_ACTION_TYPES.SIGNIN_FAILURE:
    case AUTH_ACTION_TYPES.UPDATE_USER_FAILURE:
    case AUTH_ACTION_TYPES.LOGOUT_FAILURE:
      return { ...state, isLoading: false, error: action.payload as AuthError };

    case AUTH_ACTION_TYPES.SIGNIN_SUCCESS:
    case AUTH_ACTION_TYPES.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload as IUser,
      };

    case AUTH_ACTION_TYPES.LOGOUT_SUCCESS:
      return {...state, currentUser:null, isLoading:false}

    case AUTH_ACTION_TYPES.CLEAR_AUTH_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
