import { Category } from "@/api/types"
import { CustomError } from "@/utils/errors.utils"
import { CategoryAction } from "./categories.actions"
import { CATEGORIES_ACTION_TYPES } from "./categories.types"

export type CategoriesState = {
    categories:Category[]
    error:CustomError|null,
    isLoading:boolean
}


const categoriesInitialState:CategoriesState = {
    categories:[], error:null, isLoading:false
}

export const categoriesReducer = (state=categoriesInitialState, action:CategoryAction|{type:string, payload?:unknown}):CategoriesState=> {

    switch(action.type){

        case CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_START:
        case CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_START:
        case CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_START:
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {...state, isLoading:true }
        
        case CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_FAILURE: 
        case CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_FAILURE: 
        case CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_FAILURE: 
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE: 
            return {...state, isLoading:false, error:action.payload as CustomError}

        case CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_SUCCESS:
            return {...state, isLoading:false, categories:[...state.categories, action.payload as Category]}
        
        case CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS:
            return {...state, isLoading:false, categories:[...state.categories.map((cat) => { if(cat.categoryId === (action.payload as Category).categoryId){ return action.payload as Category  }else{ return cat } } )]}
        case CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_SUCCESS:
            return {...state, isLoading:false, categories:[...state.categories.filter((cat) => cat.categoryId !== (action.payload as Category).categoryId)]}
        
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {...state, isLoading:false, categories:(action.payload as Category[])}
        default:
            return state
    }
}