import axios from 'axios';

export const getAllLotes = (token: string) =>
  axios
    .get('/propietario/lotes/all', {headers: {authorization: token}})
    .then((response) => response.data);

export const registerPropietario = (register: RegisterDTO) =>
  axios.post('/propietario/register', register);

type RegisterDTO = {message: string; nickname: string; id: string};
