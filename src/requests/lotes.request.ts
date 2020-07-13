import axios from 'axios';

export const getAllLotes = (token: string) =>
  axios
    .get('/propietario/lotes/all', {headers: {authorization: token}})
    .then((response) => response.data);

export const registerPropietario = (
  token: string,
  register: RegisterPropietarioDTO,
) =>
  axios.post('/propietario/register', register, {
    headers: {authorization: token},
  });

export type RegisterPropietarioDTO = {
  message: string;
  nickname: string;
  id: string;
};
