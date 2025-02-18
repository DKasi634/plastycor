

import { takeLatest, all, call, put } from "redux-saga/effects";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { Category } from "@/api/types";
import { createOrUpdateCategory, disableCategory, fetchAllFirestoreCategories, getCategoryById, getCategoryByName } from "@/utils/firebase/firestore.utils";
import { createCategoryFailure, createCategorySuccess, deleteCategorySuccess, fetchCategoriesFailure, fetchCategoriesSuccess, updateCategoryFailure, updateCategorySuccess } from "./categories.actions";
import { setErrorToast, setSuccessToast } from "../toast/toast.actions";
import { ActionWithPayload } from "@/utils/reducer/reducer.utils";



function* fetchCategories(){
    try {
        const categories:Category[] = yield call(fetchAllFirestoreCategories);
        // if(!categories.length){ throw new Error("Found no categories")};
        yield put(fetchCategoriesSuccess(categories))
    } catch (error) {
        yield put(fetchCategoriesFailure(error));
    }
}

function* createCategory({payload:category}:ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_START, Category>){
    try {
        const existingCategory:Category|null = yield call(getCategoryByName, category.categoryName);
        if(existingCategory){ yield put(setErrorToast("A category with a similar name exists")); 
            throw new Error("Failed to created category")}
        const createdCategory:Category|null = yield call(createOrUpdateCategory, {...category, createdAt:new Date().toISOString(), categoryId:new Date().getTime().toString()} as Category)
        
        if(!createdCategory){ throw new Error("Failed to created category") }
        yield put(createCategorySuccess(createdCategory));
        yield put(setSuccessToast("Category created successfully !"));
    } catch (error) {
        // console.log("Could not create category due to : ", error)
        yield put(createCategoryFailure(error));
        yield put(setErrorToast("Something went wrong ! Failed to create the category"));
    }
}

function* updateCategory({payload:category}:ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_START, Category>){
    try {
        const existingCategory:Category|null = yield call(getCategoryById, category.categoryId);
        if(!existingCategory){ yield put(setErrorToast("This category doesn't exist")); 
            throw new Error("Failed to update category")}
        const updatedCategory:Category|null = yield call(createOrUpdateCategory, category)
        
        if(!updatedCategory){ throw new Error("Failed to update category") }
        yield put(updateCategorySuccess(updatedCategory));
        yield put(setSuccessToast("Category updated successfully !"));
    } catch (error) {
        yield put(updateCategoryFailure(error));
        yield put(setErrorToast("Something went wrong ! Failed to update the category"));
    }
}
function* deleteCategory({payload:category}:ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_START, Category>){
    try {
        const existingCategory:Category|null = yield call(getCategoryById, category.categoryId);
        if(!existingCategory){ yield put(setErrorToast("This category doesn't exist")); 
            throw new Error("Failed to delete category")}
        const deletedCategory:Category|null = yield call(disableCategory, category)
        
        if(!deletedCategory){ throw new Error("Failed to delete category") }
        yield put(deleteCategorySuccess(deletedCategory));
        yield put(setSuccessToast("Category removed successfully !"));
    } catch (error) {
        yield put(createCategoryFailure(error));
        yield put(setErrorToast("Something went wrong ! Failed to delete the category"));
    }
}

export function* watchCategoriesFetch(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategories)
}
export function* watchCategoryDeletion(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_START, deleteCategory)
}

export function* watchCategoryCreation(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_START, createCategory);
}
export function* watchCategoryUpdate(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_START, updateCategory)
}

export function* categoriesSaga(){
    yield all([call(watchCategoriesFetch), call(watchCategoryCreation), call(watchCategoryUpdate), call(watchCategoryDeletion)])
}