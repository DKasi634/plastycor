
import { CustomError } from "@/utils/errors.utils"
import { InnovationAction } from "./innovations.actions"
import { INNOVATIONS_ACTION_TYPES } from "./innovations.types"
import { Innovation } from "@/api/types"

export type InnovationsState = {
    readInnovationsIds:string[],
    likedInnovationsIds:string[],
    isLoading:boolean,
    error:CustomError|null
}

const initialReadInnovationsIds:InnovationsState = {
    readInnovationsIds:[], likedInnovationsIds:[], isLoading:false, error:null
}

export const innovationsReducer = (state=initialReadInnovationsIds, action:InnovationAction | {type:string, payload?:unknown}):InnovationsState =>{
    switch(action.type){
        case INNOVATIONS_ACTION_TYPES.READ_INNOVATION_START:
        case INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_START:
        case INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_START:
            return {...state, isLoading:true}
        case INNOVATIONS_ACTION_TYPES.READ_INNOVATION_FAILURE:
        case INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_FAILURE:
        case INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_FAILURE:
            return {...state, isLoading:false, error:action.payload as CustomError}
        case INNOVATIONS_ACTION_TYPES.READ_INNOVATION_SUCCESS:
            return {...state,  readInnovationsIds:[...state.readInnovationsIds.filter(id => id !== (action.payload as Innovation).id ), (action.payload as Innovation).id], isLoading:false}
        case INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_SUCCESS:
            return {...state,  likedInnovationsIds:[...state.likedInnovationsIds.filter(id => id !== (action.payload as Innovation).id ), (action.payload as Innovation).id], isLoading:false}
        
            case INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_SUCCESS:
            return {...state,  likedInnovationsIds:[...state.likedInnovationsIds.filter(id => id !== (action.payload as Innovation).id )], isLoading:false}
        default:
            return state
    }
}