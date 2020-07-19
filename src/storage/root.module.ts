import {loadSession} from '../actions/session.actions';
import sessionReducer from './session.reducer';
import userReducer from './user.reducer';

const RootModule = {
  id: 'root_module',
  reducerMap: {
    user: userReducer,
    session: sessionReducer,
  },
  initialActions: [loadSession()],
};

export default RootModule;
