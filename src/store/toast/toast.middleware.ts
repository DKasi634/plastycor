import { Middleware, MiddlewareAPI } from "redux";
import { RootState } from "../rootReducer";
import { clearToast } from "./toast.actions";

export const toastMiddleware: Middleware = (store:MiddlewareAPI) => (next) => (action) =>{
    let toastTimer:NodeJS.Timeout|null = null

    const clearToastTimer = () =>{
        if(toastTimer){
            clearTimeout(toastTimer);
            toastTimer = null
        }
    };

    const dispatch = (action:any) => {
        const result = next(action);
        const state:RootState = store.getState();

        if(state.toast){
            clearToastTimer();
            toastTimer = setTimeout(()=>{
                store.dispatch(clearToast());
            }, 3000)
        } else { clearToastTimer(); }
        return result
    };

    return dispatch
}