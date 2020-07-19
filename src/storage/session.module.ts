import axios from 'axios';
import {Reducer} from 'redux';
import {LoginAction} from '../actions/login.actions';
import {loadSession} from '../actions/session.actions';

export enum SessionAction {
  LOADING_SESSION = 'loading_session',
  SESSION_LOADED = 'session_loaded',
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
      axios.defaults.headers.common['Authorization'] = action.data.token;
      return {
        ...state,
        token: action.data.token,
        exp: action.data.exp,
        loadingToken: false,
      };
    case SessionAction.LOADING_SESSION:
      return {...state, loadingToken: true};
    case SessionAction.SESSION_LOADED:
      axios.defaults.headers.common['Authorization'] = action.token;
      return {
        ...state,
        token: action.token,
        exp: action.exp,
        loadingToken: false,
      };
    case SessionAction.NO_SESSION_FOUND:
    case LoginAction.LOG_OUT:
      axios.defaults.headers.common['Authorization'] = '';
      return {...initialState, loadingToken: false};
    default:
      return state;
  }
};

const SessionModule = {
  initialState,
  id: 'session_module',
  reducerMap: {
    session: sessionReducer,
  },
  initialActions: [loadSession()],
};

export default SessionModule;
