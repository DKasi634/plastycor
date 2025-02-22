import { Middleware } from "redux";
import { RootState } from "./rootReducer";
import { AUTH_ACTION_TYPES } from "./auth/auth.types";

// Define the session timeout duration (e.g., 10 hours)
const SESSION_TIMEOUT = 10 * 60 * 60 * 1000; // 10 hours in milliseconds

// Define a separate variable to store the timer
let sessionTimer: NodeJS.Timeout | undefined;

// Middleware to handle session expiration
const sessionExpirationMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);

  // Get the current state after the action is processed
  const currentState = store.getState().auth;

  // Check if the user is logged in
  if (currentState.currentUser && !currentState.isLoading) {
    // Start or reset the session timer
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }

    sessionTimer = setTimeout(() => {
      console.log("Session expired! Logging out...");
      store.dispatch({ type: AUTH_ACTION_TYPES.LOGOUT_START });
    }, SESSION_TIMEOUT);
  } else {
    // Clear the timer if the user is logged out
    if (sessionTimer) {
      clearTimeout(sessionTimer);
      sessionTimer = undefined;
    }
  }

  return result;
};

export default sessionExpirationMiddleware;