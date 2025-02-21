import { createSelector } from "reselect";
import { RootState } from "../rootReducer";


const blogsSlice  = (state:RootState) => state.blogs

export const selectReadBlogsIds = createSelector(
    [blogsSlice], slice => slice.readBlogsIds
)
export const selectReadBlogsLoading = createSelector(
    [blogsSlice], slice => slice.isLoading
)

