import { FirebaseError } from "firebase/app";

export type AuthError = {
    code?: string,
    message: string
}

export type CustomError = {
    name: string,
    message: string
}

export const getAuthError = (error: unknown): AuthError => {

    if (error instanceof FirebaseError) {
        switch (error.code) {
            case "auth/user-not-found":
                return { code: error.code, message: "Utilisateur inexistant." };

            case "auth/wrong-password":
                return { code: error.code, message: "Mot de passe incorrect." };

            case "auth/email-already-in-use":
                return { code: error.code, message: "L'adresse e-mail est déjà utilisée." };

            case "auth/invalid-email":
                return { code: error.code, message: "Adresse e-mail invalide." };

            case "auth/too-many-requests":
                return { code: error.code, message: "Trop de tentatives échouées. Veuillez réessayer plus tard." };

            case "auth/network-request-failed":
                return { code: error.code, message: "Erreur réseau. Veuillez vérifier votre connexion et réessayer." };

            case "auth/user-disabled":
                return { code: error.code, message: "Ce compte a été désactivé par un administrateur." };

            case "auth/popup-closed-by-user":
                return { code: error.code, message: "La fenêtre contextuelle a été fermée avant la fin de la connexion." };

            case "auth/popup-blocked":
                return { code: error.code, message: "Fenêtre contextuelle bloquée par le navigateur." };

            case "auth/operation-not-allowed":
                return { code: error.code, message: "Cette opération n'est pas autorisée. Veuillez contacter le support." };

            case "auth/requires-recent-login":
                return { code: error.code, message: "Veuillez vous reconnecter pour effectuer cette action." };

            case "auth/credential-already-in-use":
                return { code: error.code, message: "Ces identifiants sont déjà associés à un autre compte utilisateur." };

            case "auth/invalid-credential":
                return { code: error.code, message: "Les identifiants fournis sont invalides ou expirés." };

            case "auth/account-exists-with-different-credential":
                return { code: error.code, message: "Un compte existe déjà avec le même e-mail mais avec des identifiants différents." };

            case "auth/invalid-verification-code":
                return { code: error.code, message: "Le code de vérification est invalide ou expiré." };

            case "auth/missing-verification-code":
                return { code: error.code, message: "Le code de vérification est manquant." };

            case "auth/missing-email":
                return { code: error.code, message: "Le champ de l'adresse e-mail est requis mais manquant." };

            case "auth/internal-error":
                return { code: error.code, message: "Une erreur interne s'est produite. Veuillez réessayer plus tard." };

            case "auth/session-cookie-expired":
                return { code: error.code, message: "Votre session a expiré. Veuillez vous reconnecter." };

            case "auth/invalid-session-cookie":
                return { code: error.code, message: "Le cookie de session est invalide. Veuillez vous reconnecter." };

            case "auth/invalid-phone-number":
                return { code: error.code, message: "Le numéro de téléphone fourni n'est pas valide." };

            case "auth/missing-phone-number":
                return { code: error.code, message: "Le numéro de téléphone est requis mais manquant." };

            case "auth/quota-exceeded":
                return { code: error.code, message: "Le quota pour cette opération a été dépassé. Veuillez réessayer plus tard." };

            case "auth/unverified-email":
                return { code: error.code, message: "L'adresse e-mail n'a pas été vérifiée." };

            case "auth/invalid-action-code":
                return { code: error.code, message: "Le code d'action est invalide ou expiré." };

            case "auth/expired-action-code":
                return { code: error.code, message: "Le code d'action a expiré." };

            case "auth/missing-password":
                return { code: error.code, message: "Le mot de passe est requis mais manquant." };

            case "auth/weak-password":
                return { code: error.code, message: "Le mot de passe est trop faible. Veuillez utiliser un mot de passe plus fort." };

            default:
                return { code: error.code, message: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard." };
        }
    } 
    else if (error instanceof Error) {
        return {message: error.message };
    }
    else {
        return { message: "Une erreur inattendue s'est produite." };
    }
};

export const getCustomError = (error: unknown): CustomError => {
    if (error instanceof Error) {
        return { name: error.name, message: error.message };
    }
    return { name: 'Erreur inconnue', message: "Une erreur inconnue s'est produite !" };
};
