import { combineReducers } from "redux"
import { authReducer, AuthState } from "./auth/auth.reducer"
import { toastReducer, ToastState } from "./toast/toast.reducer";
import { categoriesReducer, CategoriesState } from "./categories/categories.reducer";
import { blogsReducer, BlogsState } from "./blogs/blogs.reducer";
import { innovationsReducer, InnovationsState } from "./innovations/innovations.reducer";

export type RootState = {
    auth:AuthState,
    categories:CategoriesState,
    blogs:BlogsState,
    innovations:InnovationsState,
    toast:ToastState
}

export const rootReducer = combineReducers({
    auth:authReducer,
    categories:categoriesReducer,
    blogs:blogsReducer,
    innovations:innovationsReducer,
    toast:toastReducer
});