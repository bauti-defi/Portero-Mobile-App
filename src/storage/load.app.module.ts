import {Reducer} from 'react';
import {AnyAction} from 'redux';
import SessionAction from '../actions/session.actions';
import {UserAction} from '../actions/user.actions';
import {loadSession} from '../events/session.events';
import userReducer from './user.module';

export interface LoadAppState {
  loadingSession: boolean;
  loadingUser: boolean;
}

const initialState: LoadAppState = {
  loadingSession: true,
  loadingUser: true,
};

const loadAppReducer: Reducer<LoadAppState, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case UserAction.LOADING_USER:
      return {...state, loadingUser: true};
    case UserAction.DONE_LOADING_USER:
      return {...state, loadingUser: false};
    case SessionAction.LOADING_SESSION:
      return {...state, loadingSession: true};
    case SessionAction.SESSION_LOADED:
    case SessionAction.NO_SESSION_FOUND:
      return {...state, loadingSession: false};
    default:
      return state;
  }
};

const LoadAppModule = {
  id: 'load_app_module',
  reducerMap: {
    loadApp: loadAppReducer,
    user: userReducer,
  },
  initialActions: [loadSession()],
};

export default LoadAppModule;
