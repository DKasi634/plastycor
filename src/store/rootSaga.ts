import { all, call } from "redux-saga/effects";
import { authSaga } from "./auth/auth.sagas";


export function* rootSaga(){
    yield all([call(authSaga)])
}