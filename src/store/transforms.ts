import { createTransform } from 'redux-persist';
import { AuthState, authStateInitialValues } from './auth/auth.reducer';
import { RootState } from './rootReducer';

// A transform that attaches a timestamp on persist and checks for expiration on rehydrate.
export const authExpireTransform = createTransform(
  // inbound: when saving the state, 
  // Here the underscore '_' replaces the 'key' parameter passed in to identify this reducers
  (inboundState:AuthState, _):AuthState => {
    console.log("Inbound traffic !")
    return {
      ...inboundState,
      _persistedAt: Date.now(),
    };
  },
  // outbound: when rehydrating the state, 
  // Here the underscore '_' replaces the 'key' parameter passed in to identify this reducers
  (outboundState:AuthState, _):AuthState => {
    console.log("Outbound traffic! ")
    if (outboundState && outboundState?._persistedAt) {
      const currentTime = Date.now();
      const tenHours = 60 * 1000; // 30 seconds in milliseconds (just for testing)
      // Check if the stored data is older than 10 hours
      if (currentTime - outboundState._persistedAt > tenHours) {
        // If expired, return undefined or an initial state
        return authStateInitialValues;
      }
    }
    return outboundState;
  },
  // Also, we have to whitelist the 'auth' part of our root state and type the whitelist option as an array that can only take a key of our RootState
  { whitelist: ['auth'] } as {whitelist:Array<keyof RootState>}
);
