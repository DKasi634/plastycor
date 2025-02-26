import { auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  UserCredential,
  onAuthStateChanged,
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

export const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

export const sendOtpToPhoneNumber = async (
  phoneNumber: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const recaptchaContainerId = RECAPTCHA_CONTAINER_ID;
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      recaptchaContainerId,
      { size: "invisible", callback: () => {} }
    );
    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        resolve(confirmationResult.verificationId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// export const confirmVerificationCode = (verificationId:string, otp:string) =>{
//   return PhoneAuthProvider.credential(verificationId, otp)
// }

export const verifyOtp = async (
  verificationId: string,
  otp: string
): Promise<boolean> => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    if (!credential) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const createAuthUser = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  if (!email.trim().length || !password.trim().length) return null;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogleRedirect = async () =>{
  const googleAuthProvider = new GoogleAuthProvider();
  return await signInWithRedirect(auth, googleAuthProvider)
}

export const siginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  if (!email.trim().length || !password.trim().length) {
    return null;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async (): Promise<void> => {

  return new Promise((resolve, reject)=>{
    try {
      setTimeout(()=>{
        resolve(signOut(auth))
      }, 3000)
    } catch (error) {
      reject(error)
    }
    
  })
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const popupProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, popupProvider);
};

export const onAuthStateChangedListener = async (
  callback: (user: User | null) => Promise<void>
) => onAuthStateChanged(auth, callback);


// export const sendCustomVerificationEmail = async (user:User):Promise<boolean> => {
//   try {
//     await sendEmailVerification(user);
//     return true
//   } catch (error) {
//     console.log("Error sending verification email as : ", error)
//     return false
//   }
// } 


export const sendCustomVerificationEmail = async (email: string, displayName: string):Promise<boolean> => {
  try {
    const response = await fetch("/.netlify/functions/send-verification-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, displayName }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    await response.json();
    // console.log("Verification email sent successfully:", data);
    return true
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return false
  }
};

