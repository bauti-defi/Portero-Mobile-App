import axios from 'axios';
import {Reducer} from 'redux';
import {deleteToken} from '.././jwt.service';
import {Action} from './dispatch.actions';

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
    case Action.STORE_TOKEN:
      axios.defaults.headers.common['Authorization'] = action.token;
      return {...state, token: action.token};
    case Action.STORE_COOKIE:
      return {...state, ...action.cookie};
    case Action.LOG_OUT:
      deleteToken();
      axios.defaults.headers.common['Authorization'] = '';
      return {};
    default:
      return state;
  }
};

export default userReducer;
