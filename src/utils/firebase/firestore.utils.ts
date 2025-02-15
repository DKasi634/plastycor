import { ApiProduct, IUser } from "@/api/types";
import { collection, doc, getDocFromServer, getDocs, query, setDoc, where } from "firebase/firestore";
import { firestoreDB } from "./firebase.config";

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

export const getProductById = async (productId: string): Promise<ApiProduct | null> => {
    const q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION), where("id", "==", productId));
    const productsSnapshot = await getDocs(q);
    if (productsSnapshot.empty) {
      return null
    }
    return productsSnapshot.docs[0].data() as ApiProduct
  }

export const createOrUpdateProduct = async (newProduct: ApiProduct): Promise<ApiProduct | null> => {
    try {
      const existingProduct = await getProductById(newProduct.id)
      const updatedProduct = { ...existingProduct, ...newProduct, createdAt: existingProduct ? existingProduct.createdAt : new Date().toISOString()} as ApiProduct
      await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION, updatedProduct.id), updatedProduct)
      return updatedProduct
    } catch (error) {
      // // console.log("Error when creating product : ", error)
      return null
    }
  
  }

  