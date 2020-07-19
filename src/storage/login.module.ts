import loginReducer from './login.reducer';
import registrationReducer from './registration.reducer';

const LoginModule = {
  id: 'login_module',
  reducerMap: {
    login: loginReducer,
    registration: registrationReducer,
  },
};

export default LoginModule;
