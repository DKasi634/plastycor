import { createSelector } from "reselect";
import { RootState } from "../rootReducer";


const innovationsSlice  = (state:RootState) => state.innovations

export const selectReadInnovationsIds = createSelector(
    [innovationsSlice], slice => slice.readInnovationsIds
)
export const selectLikedInnovationsIds = createSelector(
    [innovationsSlice], slice => slice.likedInnovationsIds
)
export const selectInnovationsLoading = createSelector(
    [innovationsSlice], slice => slice.isLoading
)


