import { all, call } from "redux-saga/effects";
import { authSaga } from "./auth/auth.sagas";
import { categoriesSaga } from "./categories/categories.sagas";


export function* rootSaga(){
    yield all([call(authSaga), call(categoriesSaga)])
}