import axios from 'axios';
import {Reducer} from 'redux';
import {deleteToken} from '.././jwt.service';

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

const userReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserAction.STORE_TOKEN:
      axios.defaults.headers.common['Authorization'] = action.token;
      return {...state, token: action.token};
    case UserAction.STORE_COOKIE:
      axios.defaults.headers.common['Authorization'] = action.cookie.token;
      return {...state, ...action.cookie};
    case UserAction.LOG_OUT:
      deleteToken();
      axios.defaults.headers.common['Authorization'] = '';
      return initialState;
    default:
      return state;
  }
};

export enum UserAction {
  STORE_TOKEN = 'store_token',
  STORE_COOKIE = 'store_cookie',
  LOG_OUT = 'log_out',
}

export default userReducer;
