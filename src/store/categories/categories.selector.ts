
import { createSelector } from "reselect";
import { RootState } from "../rootReducer";



const categoriesSlice = (state:RootState) => state.categories

export const selectCategories = createSelector(
    [categoriesSlice], slice => slice.categories
)

export const selectCategoriesError = createSelector(
    [categoriesSlice], slice => slice.error
)

export const selectCategoriesLoading = createSelector(
    [categoriesSlice], slice => slice.isLoading
)