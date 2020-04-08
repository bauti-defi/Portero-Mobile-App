import {Reducer} from 'redux';
import {Action} from './dispatch.actions';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from './app.store';

export interface UserState {
  token: string;
  acc_id: string;
  email: string;
  session_id: string;
  type: number;
}

const initialState: UserState = {
  token: null,
  acc_id: null,
  email: null,
  session_id: null,
  type: null,
};

export const useUserSelector: TypedUseSelectorHook<
  RootState & UserState
> = useSelector;

const userReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.STORE_TOKEN:
        return {...state, token: action.token}
    case Action.STORE_COOKIE:
      return {...state, ...action.cookie};
    case Action.DELETE_COOKIE:
      return {
        ...state,
        token: null,
        acc_id: null,
        email: null,
        session_id: null,
        type: null,
      };
    default:
      return state;
  }
};

export default userReducer;
