import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { AUTH_ACTION_TYPES } from "./auth.types";
import { ActionWithPayload } from "@/utils/reducer/reducer.utils";
import {
  createAuthUser,
  logout,
  sendCustomVerificationEmail,
  siginWithEmail
} from "@/utils/firebase/firebase.auth";
import { IUser } from "@/api/types";
import {
  logoutFailure,
  logoutSuccess,
  registerFailure,
  registerSuccess,
  signInFailure,
  signInSuccess,
} from "./auth.actions";
import { UserCredential } from "firebase/auth";
import {
  createOrUpdateFirestoreUser,
  getFirestoreUserByEmail,
} from "@/utils/firebase/firestore.utils";
import { setErrorToast, setSuccessToast } from "../toast/toast.actions";
import { getAuthError } from "@/utils/errors.utils";
import { selectCurrentUser } from "./auth.selector";


function* registerUser({
  payload: { firstName, lastName, email, password, phoneNumber },
}: ActionWithPayload<
  AUTH_ACTION_TYPES.REGISTER_START,
  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }
>) {
  try {
    const newAuthUser: UserCredential | null = yield call(
      createAuthUser,
      email,
      password
    );
    
    if (!newAuthUser) {
      throw new Error("Failed to create the user");
    }
    // try {
    //   yield call(auth.updateCurrentUser, { ...newAuthUser.user, displayName:`${firstName} ${lastName}`});
    //   auth.currentUser?.reload();
    // } catch (error) {
    //   console.log("Error updating current user : ", error)
    // }
    
    const verificationEmailSent:boolean = yield call(sendCustomVerificationEmail, email, `${firstName} ${lastName}`);
    if(!verificationEmailSent){ throw new Error("Failed to send a verification email ") }
    
    yield call(logout);

    const createdUser: IUser = {
      email,
      firstName,
      lastName,
      adminStatus:null,
      phoneNumber,
      disabled: false,
      createdAt: new Date().toISOString(),
      profilePicture: `https://placehold.co/200x200/207fff/FFF?text=${ firstName.at(0)?.toUpperCase() || email.at(0)?.toUpperCase()}`,
    };
    yield call(createOrUpdateFirestoreUser, createdUser);
    yield put(registerSuccess(createdUser));
    yield put( setSuccessToast("Inscription réussie ! Veuillez vérifier votre email pour activer votre compte."));
    
  } catch (error) {
    yield put(registerFailure(error));
    // yield put(setErrorToast("Échec de l'inscription ! Quelque chose s'est mal passé"));
    yield put(setErrorToast(getAuthError(error).message));
  }
}

function* emailSignIn({
  payload: { email, password },
}: ActionWithPayload<
  AUTH_ACTION_TYPES.EMAIL_SIGNIN_START,
  { email: string; password: string }
>) {
  try {
    const user: UserCredential | null = yield call(
      siginWithEmail,
      email,
      password
    );
    if (!user) {
      throw new Error("Signin failed, something went wrong !");
    }
    if(!user.user.emailVerified){
      throw new Error("Desolé, vous devez verifier votre email avant de vous connecter ")
    }
    const firestoreUser: IUser | null = yield call(
      getFirestoreUserByEmail,
      email
    );
    if (!firestoreUser) {
      throw new Error("Utilisateur introuvable ");
    }
    yield put(signInSuccess(firestoreUser));
  } catch (error) {
    yield put(signInFailure(error));
    // yield put(setErrorToast("Échec de connexion ! Quelque chose s'est mal passé"))
    yield put(setErrorToast(getAuthError(error).message))
  }
}


function* googleSignInComplete({payload:{email, displayName, phoneNumber, photoURL}}:ActionWithPayload<AUTH_ACTION_TYPES.GOOGLE_SIGNIN_COMPLETE, {email:string, displayName:string, createdAt:string, phoneNumber:string, photoURL:string}>) {
  try {
    if (!email) {
      throw new Error("Signin failed, something went wrong !");
    }
    const existingUser: IUser | null = yield call( getFirestoreUserByEmail, email);
    const firstName = displayName?.split(" ")[0] || `User@${new Date().getTime()}`;

    const lastName = displayName?.split(" ")[1] || ``;

    const newUser: IUser = {
      email,
      firstName,
      lastName,
      disabled: false,
      createdAt: new Date().toISOString(),
      phoneNumber: phoneNumber || "",
      adminStatus:existingUser?.adminStatus || null,
      profilePicture:
        photoURL ||
        `https://placehold.co/200x200/207fff/FFF?text=${ email.at(0)?.toUpperCase()}`,
    };
    const firestoreUser: IUser = { ...existingUser, ...newUser };

    yield call(createOrUpdateFirestoreUser, firestoreUser);
    yield put(signInSuccess(firestoreUser));
  } catch (error) {
    yield put(signInFailure(error));
    yield put(setErrorToast(getAuthError(error).message))
  }
}

function* setUser({payload:userEmail}:ActionWithPayload<AUTH_ACTION_TYPES.SET_CURRENT_USER, string>){
  try{
      if(!userEmail){ return }
      const userDoc:IUser|null = yield call(getFirestoreUserByEmail, userEmail);
      if(!userDoc || userDoc.disabled){ 
        const currentUser:IUser = yield select(selectCurrentUser);
        if(currentUser){ 
           // This is to prevent automatic sign in on signup , also in case the app refreshes while a logged in user has been removed or disabled in our firestore, they should be logged out automatically
          yield call(logout);
         }

        return
      }else{
          yield put(signInSuccess(userDoc))
      }
  } catch(error){
      yield put(signInFailure(error))
  }
}


export function* watchSetCurrentUser(){
  yield takeLatest(AUTH_ACTION_TYPES.SET_CURRENT_USER, setUser)
}


export function* watchRegistration() {
  yield takeLatest(AUTH_ACTION_TYPES.REGISTER_START, registerUser);
}

export function* watchEmailSignin() {
  yield takeLatest(AUTH_ACTION_TYPES.EMAIL_SIGNIN_START, emailSignIn);
}

export function* watchGoogleSignInCompletion() {
  yield takeLatest(AUTH_ACTION_TYPES.GOOGLE_SIGNIN_COMPLETE, googleSignInComplete);
}



function* logUserOut(){

  try {
    // console.log("Logout started !")
    yield logout();
    yield put(logoutSuccess())
  } catch (error) {
    yield put(logoutFailure(error))
  }
}

export function* watchLogout(){
  yield takeLatest(AUTH_ACTION_TYPES.LOGOUT_START, logUserOut)
}

export function* authSaga() {
  yield all([
    call(watchRegistration),
    call(watchEmailSignin),
    call(watchGoogleSignInCompletion),
    call(watchLogout),
    call(watchSetCurrentUser)
  ]);
}
