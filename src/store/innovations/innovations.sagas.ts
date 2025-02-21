import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionWithPayload } from "@/utils/reducer/reducer.utils";
import { Innovation } from "@/api/types";
import { likeFirestoreInnovation, viewFirestoreInnovation } from "@/utils/firebase/firestore.utils";
import { INNOVATIONS_ACTION_TYPES } from "./innovations.types";
import { likeInnovationFailure, likeInnovationSuccess, readInnovationFailure, readInnovationSuccess } from "./innovations.actions";


function* readInnovation({payload:innovation}:ActionWithPayload<INNOVATIONS_ACTION_TYPES.READ_INNOVATION_START, Innovation>){
    try {
        const viewedInnovation:Innovation|null = yield call(viewFirestoreInnovation, innovation);
        if(!viewedInnovation){ throw new Error("Failed to read the innovation") }
        yield put(readInnovationSuccess(viewedInnovation))
    } catch (error) {
        yield put(readInnovationFailure(error))
    }
}

export function* watchInnovationRead(){
    yield takeLatest(INNOVATIONS_ACTION_TYPES.READ_INNOVATION_START, readInnovation)
}

function* likeInnovation({payload:innovation}:ActionWithPayload<INNOVATIONS_ACTION_TYPES.READ_INNOVATION_START, Innovation>){
    try {
        const likedInnovation:Innovation|null = yield call(likeFirestoreInnovation, innovation);
        if(!likedInnovation){ throw new Error("Failed to like the innovation") }
        yield put(likeInnovationSuccess(likedInnovation))
    } catch (error) {
        yield put(likeInnovationFailure(error))
    }
}

export function* watchInnovationLike(){
    yield takeLatest(INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_START, likeInnovation)
}

export function* innovationsSagas() {
    yield all([call(watchInnovationRead), call(watchInnovationLike)])
}