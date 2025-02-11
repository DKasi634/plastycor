import { IUser } from "@/api/types";
import { collection, doc, getDoc, getDocFromServer, query, setDoc } from "firebase/firestore";
import { auth, firestoreDB } from "./firebase.config";

export enum FIRESTORE_COLLECTIONS{
    USERS_COLLECTION="Users",
    PRODUCTS_COLLECTION="Products",
    INNOVATIONS_COLLECTION="Innovations",
}

export const getFirestoreCollectionRef = (collectionName:FIRESTORE_COLLECTIONS) => collection(firestoreDB, collectionName)
export const getUserDocRef = (userEmail:string) => doc(firestoreDB, FIRESTORE_COLLECTIONS.USERS_COLLECTION, userEmail)


export const getFirestoreUserByEmail = async (userEmail:string): Promise<IUser|null>=>{
    try {
        const userDocRef = getUserDocRef(userEmail)
        const docSnapshot = await getDocFromServer(userDocRef);
        if(!docSnapshot.exists()){ return null }
        return docSnapshot.data() as IUser
    } catch (error) {
        return null
    }
}

export const createOrUpdateFirestoreUser = async(newUser:IUser):Promise<IUser> =>{
        const existingUser = await getFirestoreUserByEmail(newUser.email);
        const user = {...existingUser, ...newUser} as IUser;
        await setDoc(getUserDocRef(user.email), user);
        return user
}

// export const disableFirebaseAuthUser = async (userEmail:string) => {
//     try {
//         const firebaseAuthUser = g
//     } catch (error) {
        
//     }
// }