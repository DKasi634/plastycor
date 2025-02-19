import { ADMIN_STATUS, ApiProduct, Blog, Category, ErrorPayload, IUser } from "@/api/types";
import { collection, doc, DocumentData, getDocFromServer, getDocs, limit, orderBy, query, QueryConstraint, QueryDocumentSnapshot, setDoc, startAfter, where } from "firebase/firestore";
import { firebaseStorage, firestoreDB } from "./firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export enum FIRESTORE_COLLECTIONS {
  USERS_COLLECTION = "Users",
  CATEGORIES_COLLECTION = "Categories",
  PRODUCTS_COLLECTION = "Products",
  INNOVATIONS_COLLECTION = "Innovations",
  BLOGS_COLLECTION = "Blogs",
}

export const getFirestoreCollectionRef = (collectionName: FIRESTORE_COLLECTIONS) => collection(firestoreDB, collectionName)
export const getUserDocRef = (userEmail: string) => doc(firestoreDB, FIRESTORE_COLLECTIONS.USERS_COLLECTION, userEmail)


export const getFirestoreUserByEmail = async (userEmail: string): Promise<IUser | null> => {
  try {
    const userDocRef = getUserDocRef(userEmail)
    const docSnapshot = await getDocFromServer(userDocRef);
    if (!docSnapshot.exists()) { return null }
    return docSnapshot.data() as IUser
  } catch (error) {
    return null
  }
}

export const fetchFirestoreUsersByChunk = async (queryLimit:number, lastUserEmail?: string): Promise<IUser[]> => {
  
  try {
    if(!queryLimit){ throw new Error("Invalid query limit ! Should be a positive number ") }
    const constraints: QueryConstraint[] = [
      orderBy("email", 'desc'),
      orderBy('createdAt', 'desc'),
      limit(queryLimit)
    ]

    let q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.USERS_COLLECTION), ...constraints);
    if (lastUserEmail && lastUserEmail.trim()) { q = query(q, startAfter(lastUserEmail)) };
    const docSnapshot = await getDocs(q);
    return docSnapshot.docs.map(doc => doc.data() as IUser)
  } catch (error) {
    return []
  }
}

export const upgradeUserToCoAdmin = async (user: IUser): Promise<IUser | null> => {
  try {
    const upgradedUser = { ...user, adminStatus: ADMIN_STATUS.CO_ADMIN } as IUser
    await setDoc(getUserDocRef(user.email), upgradedUser);
    return upgradedUser
  } catch (error) {
    return null
  }
}

export const downgradeUserFromCoAdmin = async (user: IUser): Promise<IUser | null> => {
  try {
    const downgradedUser = { ...user, adminStatus: null } as IUser
    await setDoc(getUserDocRef(user.email), downgradedUser);
    return downgradedUser
  } catch (error) {
    return null
  }
}

export const disableFirebaseUser = async (user: IUser): Promise<IUser | null> => {
  try {

    const response = await fetch("/.netlify/functions/disable-user", { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ email: user.email }) });
    if (!response.ok) {
      const errorData: ErrorPayload = await response.json();
      throw new Error(errorData.error || `Failed to disable the user : ${user.email}`)
    }
    const disabledUser = { ...user, disabled: true } as IUser
    await setDoc(getUserDocRef(user.email), disabledUser);
    return disabledUser
  } catch (error) {
    return null
  }
}

export const enableFirebaseUser = async (user: IUser): Promise<IUser | null> => {
  try {

    const response = await fetch("/.netlify/functions/enable-user", { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ email: user.email }) });
    if (!response.ok) {
      const errorData: ErrorPayload = await response.json();
      throw new Error(errorData.error || `Failed to enable the user : ${user.email}`)
    }
    const enabledUser = { ...user, disabled: false } as IUser
    await setDoc(getUserDocRef(user.email), enabledUser);
    return enabledUser
  } catch (error) {
    return null
  }
}

export const createOrUpdateFirestoreUser = async (newUser: IUser): Promise<IUser> => {
  const existingUser = await getFirestoreUserByEmail(newUser.email);
  const user = { ...existingUser, ...newUser } as IUser;
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
    const updatedProduct = { ...existingProduct, ...newProduct, createdAt: existingProduct ? existingProduct.createdAt : new Date().toISOString() } as ApiProduct
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION, updatedProduct.id), updatedProduct)
    return updatedProduct
  } catch (error) {
    return null
  }
}

export const disableFirestoreProduct = async (product: ApiProduct): Promise<ApiProduct | null> => {
  try {

    const disabledProduct = { ...product, disabled: true } as ApiProduct
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION, product.id), disabledProduct);
    return disabledProduct
  } catch (error) {
    return null
  }
}

export const enableFirestoreProduct = async (product: ApiProduct): Promise<ApiProduct | null> => {
  try {
    const enabledProduct = { ...product, disabled: false } as ApiProduct
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION, product.id), enabledProduct);
    return enabledProduct
  } catch (error) { return null
  }
}

type firestoreDocSnapshot = QueryDocumentSnapshot<DocumentData, DocumentData>

export const fetchFirestoreProductsByChunk = async (queryLimit=15, customFilter:QueryConstraint | null, lastDoc:firestoreDocSnapshot | null):Promise<firestoreDocSnapshot[]> => {
  try {
      const constraints: QueryConstraint[] = [
          customFilter as QueryConstraint,
          orderBy('createdAt', 'desc'),
          orderBy('id', 'desc'),
          limit(queryLimit)
      ].filter(Boolean)

      let q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.PRODUCTS_COLLECTION), ...constraints);
      if (lastDoc) {  q = query(q, startAfter(lastDoc))}
      const docsSnapshot = await getDocs(q);
    return docsSnapshot.docs
  } catch (error) {
      return []
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
    const updatedCategory = { ...existingCategory, ...newCategory, createdAt: existingCategory ? existingCategory.createdAt : new Date().toISOString() } as Category
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION, updatedCategory.categoryId), updatedCategory)
    return updatedCategory
  } catch (error) {
    return null
  }
}


export const disableCategory = async (categoryToDisable: Category): Promise<Category | null> => {
  try {
    const existingCategory = await getCategoryById(categoryToDisable.categoryId)
    if (!existingCategory) { throw new Error("Could not find category to disable") };
    const newDisabledCategory = { ...existingCategory, disabled: true } as Category
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION, existingCategory.categoryId), newDisabledCategory)
    return newDisabledCategory
  } catch (error) {
    return null
  }
}

export const fetchAllFirestoreCategories = async (): Promise<Category[]> => {
  try {
    const q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.CATEGORIES_COLLECTION));
    const docsSnapshot = await getDocs(q);
    if (docsSnapshot.empty) { throw new Error("Found no category") };
    return docsSnapshot.docs.map(doc => doc.data() as Category)
  } catch (error) {
    // console.log("Error fetching categories : ", error)
    return []
  }
}



export const getBlogById = async (blogId: string): Promise<Blog | null> => {
  const q = query(getFirestoreCollectionRef(FIRESTORE_COLLECTIONS.BLOGS_COLLECTION), where("id", "==", blogId));
  const blogSnapshot = await getDocs(q);
  if (blogSnapshot.empty) {
    return null
  }
  return blogSnapshot.docs[0].data() as Blog
}

export const createOrUpdateBlog = async (newBlog: Blog): Promise<Blog | null> => {

  try {
    const existingBlog = await getBlogById(newBlog.id)
    const updatedBlog = { ...existingBlog, ...newBlog, createdAt: existingBlog ? existingBlog.createdAt : new Date().toISOString() } as Blog
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.BLOGS_COLLECTION, updatedBlog.id), updatedBlog)
    return updatedBlog
  } catch (error) {
    return null
  }
}

export const disableFirestoreBlog = async (blog: Blog): Promise<Blog | null> => {
  try {

    const disabledBlog = { ...blog, disabled: true } as Blog
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.BLOGS_COLLECTION, blog.id), disabledBlog);
    return disabledBlog
  } catch (error) {
    return null
  }
}

export const enableFirestoreBlog = async (blog: Blog): Promise<Blog | null> => {
  try {
    const enabledBlog = { ...blog, disabled: false } as Blog
    await setDoc(doc(firestoreDB, FIRESTORE_COLLECTIONS.BLOGS_COLLECTION, blog.id), enabledBlog);
    return enabledBlog
  } catch (error) { return null
  }
}


export const uploadImageToStorage = async (fileToUpload:File, folderPath:string): Promise<string> => {
      const storage = firebaseStorage;
        const imageName = `image_${new Date().getTime()}`;
        const storageRef = ref(storage, `${folderPath}/${imageName}`);
        await uploadBytes(storageRef, fileToUpload);
        const url = await getDownloadURL(storageRef);
        return url
    };
