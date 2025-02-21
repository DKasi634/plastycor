import { Blog } from "@/api/types";
import { CustomError, getCustomError } from "@/utils/errors.utils";
import { ActionWithPayload, createAction } from "@/utils/reducer/reducer.utils";

export enum BLOGS_ACTION_TYPES {
    READ_BLOG_START="blog/READ_BLOG_START",
    READ_BLOG_FAILURE="blog/READ_BLOG_FAILURE",
    READ_BLOG_SUCCESS="blog/READ_BLOG_SUCCESS",
}

type ReadBlogStart = ActionWithPayload<BLOGS_ACTION_TYPES.READ_BLOG_START, Blog>
type ReadBlogFailure = ActionWithPayload<BLOGS_ACTION_TYPES.READ_BLOG_FAILURE, CustomError>
type ReadBlogSuccess = ActionWithPayload<BLOGS_ACTION_TYPES.READ_BLOG_SUCCESS, Blog>

export type BlogAction = ReadBlogStart | ReadBlogFailure | ReadBlogSuccess

export const readBlogStart = (blog:Blog):ReadBlogStart => createAction(BLOGS_ACTION_TYPES.READ_BLOG_START, blog)
export const readBlogFailure = (error:unknown):ReadBlogFailure => createAction(BLOGS_ACTION_TYPES.READ_BLOG_FAILURE, getCustomError(error))
export const readBlogSuccess = (blog:Blog):ReadBlogSuccess => createAction(BLOGS_ACTION_TYPES.READ_BLOG_SUCCESS, blog)