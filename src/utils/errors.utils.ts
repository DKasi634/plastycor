import { FirebaseError } from "firebase/app";


export type AuthError = {
    code?:string,
    message:string
}

export type CustomError= {
    name:string,
    message:string
}

export const getAuthError = (error: unknown): AuthError => {
    
    if (error instanceof FirebaseError) {
        switch (error.code) {
            case "auth/user-not-found":
                return { code: error.code, message: "User does not exist" };

            case "auth/wrong-password":
                return { code: error.code, message: "Incorrect password" };

            case "auth/email-already-in-use":
                return { code: error.code, message: "Email is already in use" };

            case "auth/invalid-email":
                return { code: error.code, message: "Invalid email address" };

            case "auth/too-many-requests":
                return { code: error.code, message: "Too many failed attempts. Please try again later." };

            case "auth/network-request-failed": 
                return { code: error.code, message: "Network error. Please check your connection and try again." };

            case "auth/user-disabled":
                return { code: error.code, message: "This account has been disabled by an administrator." };

            case "auth/popup-closed-by-user":
                return { code: error.code, message: "Popup closed before completing sign-in." };
            case "auth/popup-blocked":
                return { code: error.code, message: "Popup blocked by the browser." };
            case "auth/operation-not-allowed":
                return { code: error.code, message: "This operation is not allowed. Please contact support." };

            case "auth/requires-recent-login":
                return { code: error.code, message: "Please log in again to perform this action." };

            case "auth/credential-already-in-use":
                return { code: error.code, message: "This credential is already associated with a different user account." };

            case "auth/invalid-credential":
                return { code: error.code, message: "The credential provided is invalid or has expired." };

            case "auth/account-exists-with-different-credential":
                return { code: error.code, message: "An account already exists with the same email but different credentials." };

            case "auth/invalid-verification-code":
                return { code: error.code, message: "The verification code is invalid or expired." };

            case "auth/missing-verification-code":
                return { code: error.code, message: "The verification code is missing." };

            case "auth/missing-email":
                return { code: error.code, message: "The email field is required but missing." };

            case "auth/internal-error":
                return { code: error.code, message: "An internal error occurred. Please try again later." };

            case "auth/session-cookie-expired":
                return { code: error.code, message: "Your session has expired. Please sign in again." };

            case "auth/invalid-session-cookie":
                return { code: error.code, message: "Your session cookie is invalid. Please sign in again." };

            case "auth/invalid-phone-number":
                return { code: error.code, message: "The provided phone number is not valid." };

            case "auth/missing-phone-number":
                return { code: error.code, message: "The phone number is required but missing." };

            case "auth/quota-exceeded":
                return { code: error.code, message: "The quota for this operation has been exceeded. Please try later." };

            case "auth/unverified-email":
                return { code: error.code, message: "The email address has not been verified." };

            case "auth/invalid-action-code":
                return { code: error.code, message: "The action code is invalid or has expired." };

            case "auth/expired-action-code":
                return { code: error.code, message: "The action code has expired." };

            case "auth/missing-password":
                return { code: error.code, message: "The password is required but missing." };

            case "auth/weak-password":
                return { code: error.code, message: "The password is too weak. Please use a stronger password." };

            default:
                return { code: error.code, message: "An unexpected error occurred. Please try again later." };     
        }
    }
    else{
        return { message: "An unexpected error occurred" };
    }
};

export const getCustomError = (error:unknown):CustomError =>{
    if(error instanceof Error){
        return {name:error.name, message:error.message}
    }
    return {name:'Unknown error', message:"An unkown error occurred!" }
}

