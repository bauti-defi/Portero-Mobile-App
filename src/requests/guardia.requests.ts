import axios from 'axios';

export const registerGuardia = (
  token: string,
  registerDTO: RegisterGuardiaDTO,
) =>
  axios.post('/guardia/register', registerDTO, {
    headers: {Authorization: token},
  });

export type RegisterGuardiaDTO = {message: string; id: string};
