import axios from 'axios';

export const registerGuardia = (registerDTO: RegisterDTO) =>
  axios.post('/guardia/register', registerDTO);

type RegisterDTO = {message: string; id: string};
