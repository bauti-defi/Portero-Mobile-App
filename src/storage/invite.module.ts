import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {getInvites, InviteAction} from '../actions/invite.actions';
import {LoginAction} from '../actions/login.actions';

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
  isLoading: boolean;
  inviteToShare: string;
  isCreating: boolean;
}

const initialState: InviteState = {
  invites: [],
  guests: [],
  isLoading: false,
  inviteToShare: null,
  isCreating: false,
};

//const removeDuplicates = (array:any[], key:string) =>

const inviteReducer = (state = initialState, action) => {
  switch (action.type) {
    case InviteAction.FINISHED_LOADING_INVITES:
      return {
        ...state,
        guests: action.guests,
        invites: action.invites,
        isLoading: false,
      };
    case InviteAction.CREATE_INVITE:
      return {...state, isCreating: action.isCreating, inviteToShare: null};
    case InviteAction.SHOW_INVITE:
      return {...state, inviteToShare: action.invite, isCreating: false};
    case InviteAction.START_LOADING_INVITES:
      return {...state, isLoading: true};
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

const InviteModule = {
  id: 'invite_module',
  reducerMap: {
    invite: inviteReducer,
  },
  initialActions: [getInvites()],
};

export default InviteModule;
