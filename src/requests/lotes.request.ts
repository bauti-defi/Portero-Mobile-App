import axios from 'axios';

export const fetchLotes = () =>
  axios.get('/propietario/lotes/all').then((response) => response.data);

export const registerPropietario = (register: RegisterPropietarioDTO) =>
  axios.post('/propietario/register', register);

export type RegisterPropietarioDTO = {
  message: string;
  nickname: string;
  id: string;
};
