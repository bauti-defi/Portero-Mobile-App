import LoginAction from '../actions/login.actions';
import {logIn} from '../requests/login.request';
import {deleteCredentials, saveCredentials} from '../secure.storage';

export const logInUser = (email: string, password: string, mid: string) => (
  dispatch,
) => {
  dispatch({type: LoginAction.ATTEMPTING_LOGIN});

  return logIn(email, password, mid) //deviceId should be DeviceInfo.getMacAddressSync()
    .then((response) => response.data)
    .then((data) => {
      dispatch({type: LoginAction.LOG_IN, data});
      saveCredentials(data.user.email, data.token, data.exp);
    })
    .catch((error) => {
      console.debug(error);
      dispatch(failedLogInUser('Email o Contrasena invalidad'));
    });
};

export const failedLogInUser = (message: string) => (dispatch) =>
  dispatch({
    type: LoginAction.FAILED_LOGIN,
    message,
  });

export const logOutUser = () => (dispatch) => {
  deleteCredentials();
  dispatch({type: LoginAction.LOG_OUT});
};
