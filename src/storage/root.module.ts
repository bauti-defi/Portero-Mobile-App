import {loadSession} from '../actions/session.actions';
import loginReducer from './login.reducer';
import registrationReducer from './registration.reducer';
import sessionReducer from './session.reducer';
import userReducer from './user.reducer';

const RootModule = {
  id: 'root_module',
  reducerMap: {
    user: userReducer,
    session: sessionReducer,
    login: loginReducer,
    registration: registrationReducer,
  },
  initialActions: [loadSession()],
};

export default RootModule;
