import { takeLatest, all, call, put } from "redux-saga/effects";
import { BLOGS_ACTION_TYPES } from "./blogs.types";
import { ActionWithPayload } from "@/utils/reducer/reducer.utils";
import { Blog } from "@/api/types";
import { viewFirestoreBlog } from "@/utils/firebase/firestore.utils";
import { readBlogFailure, readBlogSuccess } from "./blogs.actions";


function* readBlog({payload:blog}:ActionWithPayload<BLOGS_ACTION_TYPES.READ_BLOG_START, Blog>){
    try {
        const readBlog:Blog|null = yield call(viewFirestoreBlog, blog);
        if(!readBlog){ throw new Error("Failed to read the blog") }
        yield put(readBlogSuccess(readBlog))
    } catch (error) {
        yield put(readBlogFailure(error))
    }
}

export function* watchBlogBlogRead(){
    yield takeLatest(BLOGS_ACTION_TYPES.READ_BLOG_START, readBlog)
}

export function* blogsSagas() {
    yield all([call(watchBlogBlogRead)])
}