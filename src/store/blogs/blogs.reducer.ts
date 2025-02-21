import { Blog } from "@/api/types"
import { BlogAction, BLOGS_ACTION_TYPES } from "./blogs.types"
import { CustomError } from "@/utils/errors.utils"

export type BlogsState = {
    readBlogsIds:string[],
    isLoading:boolean,
    error:CustomError|null
}

const initialReadBlogsIds:BlogsState = {
    readBlogsIds:[], isLoading:false, error:null
}

export const blogsReducer = (state=initialReadBlogsIds, action:BlogAction | {type:string, payload?:unknown}):BlogsState =>{
    switch(action.type){
        case BLOGS_ACTION_TYPES.READ_BLOG_START:
            return {...state, isLoading:true}
        case BLOGS_ACTION_TYPES.READ_BLOG_FAILURE:
            return {...state, isLoading:false, error:action.payload as CustomError}
        case BLOGS_ACTION_TYPES.READ_BLOG_SUCCESS:
            return {...state,  readBlogsIds:[...state.readBlogsIds.filter(id => id !== (action.payload as Blog).id ), (action.payload as Blog).id], isLoading:false}
        default:
            return state
    }
}