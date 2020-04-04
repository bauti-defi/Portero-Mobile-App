import { Reducer} from "redux";
import { Action } from "./dispatch.actions";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./app.store";


export interface UserState{
    token: string;
}

const initialState:UserState = {
    token: null
}

export const useUserSelector: TypedUseSelectorHook<RootState & UserState> = useSelector

const userReducer:Reducer = (state = initialState, action) => {
    switch(action.type){
        case Action.STORE_TOKEN: 
            return {...state, token: action.token};
        case Action.DELETE_TOKEN:
            return {...state, token: null}
        default: 
            return state;
    }
}

export default userReducer;