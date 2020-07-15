import {LoginAction} from '../actions/login.actions';

export interface LoginState {
  attempting: boolean;
  errorMessage: string;
}

const initialState: LoginState = {
  attempting: false,
  errorMessage: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginAction.ATTEMPTING_LOGIN:
      return {...state, attempting: true};
    case LoginAction.FAILED_LOGIN:
      return {...state, attempting: false, errorMessage: action.message};
    case LoginAction.LOG_IN:
    case LoginAction.LOG_OUT:
    case LoginAction.RESET:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
