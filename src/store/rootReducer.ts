import { combineReducers } from "redux"
import { authReducer, AuthState } from "./auth/auth.reducer"
import { toastReducer, ToastState } from "./toast/toast.reducer";
import { categoriesReducer, CategoriesState } from "./categories/categories.reducer";
import { blogsReducer, BlogsState } from "./blogs/blogs.reducer";

export type RootState = {
    auth:AuthState,
    categories:CategoriesState,
    blogs:BlogsState,
    toast:ToastState
}

export const rootReducer = combineReducers({
    auth:authReducer,
    categories:categoriesReducer,
    blogs:blogsReducer,
    toast:toastReducer
});