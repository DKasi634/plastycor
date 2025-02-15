import { takeLatest, all, call, put } from "redux-saga/effects";
import { AUTH_ACTION_TYPES } from "./auth.types";
import { ActionWithPayload } from "@/utils/reducer/reducer.utils";
// import { UserCredential } from "firebase/auth"
import {
  createAuthUser,
  siginWithEmail,
  signInWithGoogle,
} from "@/utils/firebase/firebase.auth";
import { IUser } from "@/api/types";
import {
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
    const createdUser: IUser = {
      email,
      firstName,
      lastName,
      phoneNumber,
      disabled: false,
      createdAt: new Date().toISOString(),
      profilePicture: `https://placehold.co/200x200/207fff/FFF?text=${ firstName.at(0)?.toUpperCase() || email.at(0)?.toUpperCase()}`,
    };
    yield call(createOrUpdateFirestoreUser, createdUser);
    yield put(registerSuccess(createdUser));
    yield put( setSuccessToast("Inscription réussie ! Vous pouvez vous connecter"));
    
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
    const firestoreUser: IUser | null = yield call(
      getFirestoreUserByEmail,
      email
    );
    if (!firestoreUser) {
      throw new Error("User does not exist in DB");
    }
    yield put(signInSuccess(firestoreUser));
  } catch (error) {
    yield put(signInFailure(error));
    // yield put(setErrorToast("Échec de connexion ! Quelque chose s'est mal passé"))
    yield put(setErrorToast(getAuthError(error).message))
  }
}


function* googleSignIn() {
  try {
    const user: UserCredential | null = yield call(signInWithGoogle);
    if (!user || !user.user.email) {
      throw new Error("Signin failed, something went wrong !");
    }
    const existingUser: IUser | null = yield call( getFirestoreUserByEmail, user.user.email);
    const firstName = user.user.displayName?.split(" ")[0] || `User@${new Date().getTime()}`;

    const lastName = user.user.displayName?.split(" ")[1] || ``;

    const newUser: IUser = {
      email: user.user.email,
      firstName,
      lastName,
      disabled: false,
      createdAt: new Date().toISOString(),
      phoneNumber: user.user.phoneNumber || "",
      profilePicture:
        user.user.photoURL ||
        `https://placehold.co/200x200/207fff/FFF?text=${ user.user.email.at(0)?.toUpperCase()}`,
    };
    const firestoreUser: IUser = { ...existingUser, ...newUser };

    yield call(createOrUpdateFirestoreUser, firestoreUser);
    yield put(signInSuccess(firestoreUser));
  } catch (error) {
    yield put(signInFailure(error));
    // yield put(setErrorToast("Échec de connexion ! Quelque chose s'est mal passé"))
    yield put(setErrorToast(getAuthError(error).message))
  }
}

function* setUser({payload:userEmail}:ActionWithPayload<AUTH_ACTION_TYPES.SET_CURRENT_USER, string>){
  try{
      if(!userEmail){ return }
      const userDoc:IUser|null = yield call(getFirestoreUserByEmail, userEmail);
      if(!userDoc){  return
      }else{
          yield put(signInSuccess(userDoc))
      }
  } catch(error){
      // console.log("Got an error dispatching user : ", error)
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

export function* watchGoogleSignIn() {
  yield takeLatest(AUTH_ACTION_TYPES.GOOGLE_SIGNIN_START, googleSignIn);
}

export function* authSaga() {
  yield all([
    call(watchRegistration),
    call(watchEmailSignin),
    call(watchGoogleSignIn),
  ]);
}
