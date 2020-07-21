import axios from 'axios';

export const registerGuardia = (registerDTO: RegisterGuardiaDTO) =>
  axios.post('/guardia/register', registerDTO);

export type RegisterGuardiaDTO = {message: string; id: string};
