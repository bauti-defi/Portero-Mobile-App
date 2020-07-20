import axios from 'axios';
import SessionAction from '../actions/session.actions';
import {getCredentials} from '../secure.storage';
import {logOutUser} from './login.events';

export const loadSession = () => (dispatch) => {
  dispatch({type: SessionAction.LOADING_SESSION});
  //console.debug('Fetching credentials from keychain...');
  return getCredentials().then((credentials) => {
    if (!!credentials.password) {
      //console.debug(`Found credentials for: ${credentials.username}!`);
      return dispatch(validateSession(credentials.password));
    }
    //console.debug(`No credentials found!`);
    axios.defaults.headers.common['Authorization'] = '';
    dispatch({type: SessionAction.NO_SESSION_FOUND});
  });
};

const validateSession = (jsonSession) => (dispatch) => {
  let session = JSON.parse(jsonSession);
  if (new Date(session.exp) > new Date()) {
    //console.debug('Session expired. Forcing log out.');
    axios.defaults.headers.common['Authorization'] = '';
    return dispatch(logOutUser());
  }
  //console.debug('Session loaded.');

  axios.defaults.headers.common['Authorization'] = session.token;
  return dispatch({
    type: SessionAction.SESSION_LOADED,
    token: session.token,
    exp: session.exp,
  });
};
