import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {InviteAction, LoginAction} from './storage.actions';

export type Guest = {
  doc_id: string;
  entered: Date;
  exited: Date;
  rejected: Date;
  fn: string;
  ln: string;
  id: string;
  invite_id: string;
};

export type Invite = {
  id: string;
  lote_id: string;
  enabled: boolean;
  exp: Date;
  creation_date: Date;
};

export interface InviteState {
  invites: Invite[];
  guests: Guest[];
  inviteToShare: string;
  isSending: boolean;
}

const initialState: InviteState = {
  invites: [],
  guests: [],
  inviteToShare: null,
  isSending: false,
};

const inviteReducer = (state = initialState, action) => {
  switch (action.type) {
    case InviteAction.FINISHED_LOADING_INVITES:
      return {...state, guests: action.guests, invites: action.invites};
    case InviteAction.START_SENDING:
      return {...state, isSending: action.isSending, inviteToShare: null};
    case InviteAction.SHOW_INVITE:
      return {...state, inviteToShare: action.invite, isSending: false};
    case LoginAction.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

const persistConfig = {
  key: 'invite',
  storage: AsyncStorage,
};

const persistedInviteReducer = persistReducer(persistConfig, inviteReducer);

export default persistedInviteReducer;
