import {register, RegisterDTO} from '../requests/register.request';
import {RegistrationAction} from '../storage/storage.actions';

export const registerUser = (dto: RegisterDTO) => (dispatch) => {
  dispatch({type: RegistrationAction.ATTEMPTING_REGISTRATION});

  return register(dto)
    .then(dispatch({type: RegistrationAction.SUCCESSFUL_REGISTRATION}))
    .catch((error) => {
      console.debug(`Login error: ${error}`);
      dispatch({type: RegistrationAction.FAILED_REGISTRATION});
    });
};
