import {Reducer} from 'redux';
import {AppAction} from '../actions/app.actions';
import {LoginAction} from '../actions/login.actions';

export enum SessionAction {
  LOADED_SESSION = 'loaded_session',
  NO_SESSION_FOUND = 'no_session_found',
}

export interface SessionState {
  token: string;
  exp: Date;
  loadingToken: boolean;
}

const initialState: SessionState = {
  token: null,
  exp: null,
  loadingToken: true,
};

export const sessionReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginAction.LOG_IN:
      return {
        ...state,
        token: action.data.token,
        exp: action.data.exp,
        loadingToken: false,
      };
    case AppAction.START_LOADING:
      return {...state, loadingToken: true};
    case SessionAction.LOADED_SESSION:
      return {
        ...state,
        token: action.token,
        exp: action.exp,
        loadingToken: false,
      };
    case SessionAction.NO_SESSION_FOUND:
    case LoginAction.LOG_OUT:
      return {...initialState, loadingToken: false};
    default:
      return state;
  }
};

export default sessionReducer;
