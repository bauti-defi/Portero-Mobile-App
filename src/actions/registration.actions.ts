import {register, RegisterDTO} from '../requests/register.request';

export enum RegistrationAction {
  ATTEMPTING_REGISTRATION = 'attempting_registration',
  SUCCESSFUL_REGISTRATION = 'successful_registration',
  FAILED_REGISTRATION = 'failed_registration',
}

export const registerUser = (dto: RegisterDTO) => (dispatch) => {
  dispatch({type: RegistrationAction.ATTEMPTING_REGISTRATION});

  return register(dto)
    .then(dispatch({type: RegistrationAction.SUCCESSFUL_REGISTRATION}))
    .catch((error) => {
      console.debug(`Login error: ${error}`);
      dispatch({type: RegistrationAction.FAILED_REGISTRATION});
    });
};
