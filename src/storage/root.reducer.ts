import { Reducer} from "redux";
import { Action } from "./dispatch.actions";
import { TypedUseSelectorHook, useSelector } from "react-redux";


interface RootState{
    token: string;
}

const initialState:RootState = {
    token: null
}

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector

const rootReducer:Reducer = (state = initialState, action) => {
    switch(action.type){
        case Action.STORE_TOKEN: 
            return {...state, token: action.token};
        case Action.DELETE_TOKEN:
            return {...state, token: null}
        default: 
            return state;
    }
}

export default rootReducer;