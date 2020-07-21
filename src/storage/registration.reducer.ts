import LoginAction from '../actions/login.actions';
import {RegistrationAction} from '../actions/registration.actions';

export interface RegistrationState {
  attempting: boolean;
  successful: boolean;
  failed: boolean;
}

const initialState: RegistrationState = {
  attempting: false,
  successful: false,
  failed: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case RegistrationAction.ATTEMPTING_REGISTRATION:
      return {...state, attempting: true, successful: false, failed: false};
    case RegistrationAction.SUCCESSFUL_REGISTRATION:
      return {...state, attempting: false, successful: true, failed: false};
    case RegistrationAction.FAILED_REGISTRATION:
      return {...state, attempting: false, successful: false, failed: true};
    case LoginAction.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default registrationReducer;
