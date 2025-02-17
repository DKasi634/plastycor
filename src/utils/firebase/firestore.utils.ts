import { ApiProduct, Category, IUser } from "@/api/types";
import { collection, doc, getDocFromServer, getDocs, query, setDoc, where } from "firebase/firestore";
import { firestoreDB } from "./firebase.config";

export enum FIRESTORE_COLLECTIONS{
    USERS_COLLECTION="Users",
    CATEGORIES_COLLECTION="Categories",
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
      return null
    }
  }


  export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
    const q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION), where("categoryId", "==", categoryId));
    const categorySnapshot = await getDocs(q);
    if (categorySnapshot.empty) {
      return null
    }
    return categorySnapshot.docs[0].data() as Category
  }

  export const getCategoryByName = async (categoryName: string): Promise<Category | null> => {
    const q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION), where("categoryName", "==", categoryName));
    const categorySnapshot = await getDocs(q);
    if (categorySnapshot.empty) {
      return null
    }
    return categorySnapshot.docs[0].data() as Category
  }
  

  export const createOrUpdateCategory = async (newCategory: Category): Promise<Category | null> => {
    try {
      const existingCategory = await getCategoryById(newCategory.categoryId)
      const updatedCategory = { ...existingCategory, ...newCategory, createdAt: existingCategory ? existingCategory.createdAt : new Date().toISOString()} as Category
      await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION, updatedCategory.categoryId), updatedCategory)
      return updatedCategory
    } catch (error) {
      console.log("\n Error in creating or updating category as : ", error)
      return null
    }
  }

  
  export const disableCategory = async (categoryToDisable:Category):Promise<Category|null> =>{
    try {
      const existingCategory = await getCategoryById(categoryToDisable.categoryId)
      if(!existingCategory){ throw new Error("Could not find category to disable") };
      const newDisabledCategory = {...existingCategory, disabled:true} as Category
      await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION, existingCategory.categoryId), newDisabledCategory)
      return newDisabledCategory
    } catch (error) {
      return null
    }
  }

  export const fetchAllFirestoreCategories = async ():Promise<Category[]> =>{
    try {
      const q  = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION));
      const docsSnapshot = await getDocs(q);
      if(docsSnapshot.empty){ throw new Error("Found no category") };
      return docsSnapshot.docs.map(doc => doc.data() as Category)
    } catch (error) {
      return []
    }
  }