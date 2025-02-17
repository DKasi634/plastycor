import { combineReducers } from "redux"
import { authReducer, AuthState } from "./auth/auth.reducer"
import { toastReducer, ToastState } from "./toast/toast.reducer";
import { categoriesReducer, CategoriesState } from "./categories/categories.reducer";

export type RootState = {
    auth:AuthState,
    categories:CategoriesState,
    toast:ToastState
}

export const rootReducer = combineReducers({
    auth:authReducer,
    categories:categoriesReducer,
    toast:toastReducer
});